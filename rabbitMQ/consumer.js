const amqp = require('amqplib');
const mysql = require('mysql2');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'web-to-db';

// ✅ Define DB connection at top-level
const consumerDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',           // ← Change to your actual username
  password: '',   // ← Change to your actual password
  database: 'olsmg_db',     // ← Change to your actual DB name
});

consumerDb.connect(err => {
  if (err) {
    console.error('❌ Consumer DB connection error:', err);
    process.exit(1);
  }
  console.log('✅ Connected to consumer DB');
});

async function startConsumer() {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(QUEUE_NAME, { durable: true });

    console.log(`🟢 Waiting for messages in queue: ${QUEUE_NAME}`);

    channel.consume(
      QUEUE_NAME,
      msg => {
        if (msg !== null) {
          const product = JSON.parse(msg.content.toString());
          console.log('📥 Received: Product ID:', product.product_id, ', Stock:', product.product_stocks);

          const updateQuery = `
            UPDATE olsmg_product
            SET product_stocks = ?, product_price = ?
            WHERE product_name = ?
          `;

          consumerDb.query(
            updateQuery,
            [product.product_stocks, product.product_price, product.product_name],
            (err, result) => {
              if (err) {
                console.error('❌ DB update error:', err);
                channel.nack(msg, false, true); // Requeue the message
                return;
              }

              // ✅ Only show product_id and stock in logs
              console.log(`✅ Product ID: ${product.product_id}, New Stock: ${product.product_stocks}`);
              channel.ack(msg);
            }
          );
        }
      },
      { noAck: false }
    );

  } catch (err) {
    console.error('❌ RabbitMQ consumer error:', err);
  }
}

startConsumer();
