// e.g. purchase-handler.js
const amqp = require('amqplib');

async function sendToQueue(data) {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    const queue = 'web-to-db';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)), { persistent: true });

    await channel.close();
    await conn.close();
}

// Example usage
sendToQueue({ product_id: 1, quantity: 3 });
