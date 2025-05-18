const amqp = require('amqplib');
const express = require('express');
const cors = require('cors');
const connection = require('./connection'); // Your DB connection module

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
    const msg = JSON.stringify({ product_id, quantity });
    channel.sendToQueue(QUEUE_NAME, Buffer.from(msg), { persistent: true });
    console.log(`Sent message to queue: ${msg}`);

    res.json({ status: 'Purchase successful' });
  } catch (err) {
    console.error('Failed to send message to RabbitMQ:', err);
    res.status(500).json({ error: 'Failed to process purchase' });
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
