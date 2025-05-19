const amqp = require('amqplib');
const express = require('express');
const cors = require('cors');
const connection = require('./connection');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'web-to-db';

const app = express();
app.use(cors());  // Enable CORS for all origins
app.use(express.json());

let channel;

async function connectRabbitMQ() {
  try {
    const conn = await amqp.connect(RABBITMQ_URL);
    channel = await conn.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });
    console.log('✅ RabbitMQ connected');
  } catch (err) {
    console.error('❌ RabbitMQ connection error:', err);
  }
}

connectRabbitMQ();

app.post('/api/purchase', async (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ error: 'Missing product_id or quantity' });
  }
  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  try {
    connection.beginTransaction(err => {
      if (err) {
        console.error('❌ Transaction start error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      connection.query(
        'SELECT product_id, product_name, product_price, product_stocks FROM product WHERE product_id = ? FOR UPDATE',
        [product_id],
        (err, results) => {
          if (err || results.length === 0) {
            connection.rollback(() => {});
            console.error('❌ Error fetching product:', err);
            return res.status(404).json({ error: 'Product not found' });
          }

          const product = results[0];

          if (product.product_stocks < quantity) {
            connection.rollback(() => {});
            return res.status(400).json({ error: 'Not enough stock available' });
          }

          const newStock = product.product_stocks - quantity;

          connection.query(
            'UPDATE product SET product_stocks = ? WHERE product_id = ?',
            [newStock, product_id],
            (err, updateResult) => {
              if (err) {
                connection.rollback(() => {});
                console.error('❌ Error updating stock:', err);
                return res.status(500).json({ error: 'Failed to update stock' });
              }

              connection.commit(err => {
                if (err) {
                  connection.rollback(() => {});
                  console.error('❌ Transaction commit failed:', err);
                  return res.status(500).json({ error: 'Transaction failed' });
                }

                // Send message **only after commit succeeds**
                if (channel) {
                  const msg = JSON.stringify({
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_price: product.product_price,
                    product_stocks: newStock,
                    product_quantity: quantity,
                  });
                  channel.sendToQueue(QUEUE_NAME, Buffer.from(msg), { persistent: true });
                  console.log(`📤 Sent to queue: ${msg}`);
                } else {
                  console.error('❌ RabbitMQ channel not initialized');
                }

                res.json({ status: 'Purchase processed and synced' });
              });
            }
          );
        }
      );
    });
  } catch (err) {
    console.error('❌ Purchase processing failed:', err);
    res.status(500).json({ error: 'Failed to process request' });
  }
});


app.get("/api/products", (req, res) => {
  connection.query("SELECT * FROM product", (err, results) => {
    if (err) {
      console.error("❌ Error fetching data: ", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
});

// Only one listen call here
app.listen(3001, () => {
  console.log('🚀 Server running on port 3001');
});
