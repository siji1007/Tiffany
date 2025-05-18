const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'web-to-db';

async function startWorker() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue(QUEUE_NAME, { durable: true });

  console.log('Worker started, waiting for messages...');
  channel.consume(QUEUE_NAME, (msg) => {
    if (msg !== null) {
      const content = JSON.parse(msg.content.toString());
      console.log(`Received purchase: product_id=${content.product_id}, quantity=${content.quantity}`);
      channel.ack(msg);
    }
  });
}

startWorker().catch(console.error);
