const amqp = require('amqplib');
const clientAdd = require('./utils/register.mail')

async function receiveOrderMail() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'microservice_mail';
    const queue = 'mail_queue';

    await channel.assertExchange(exchange, 'direct', { durable: false });
    await channel.assertQueue(queue, { durable: false });
    await channel.bindQueue(queue, exchange, 'sentMail');

    console.log('Waiting for mailing orders. To exit, press Ctrl+C');

    channel.consume(queue, async (msg) => {
        const ordenCorreo = JSON.parse(msg.content.toString());
        clientAdd(ordenCorreo);
        console.log(`Mailing order received: ${JSON.stringify(ordenCorreo)}`);

        channel.ack(msg);
    });
  } catch (error) {
    console.error('Error receiving mail order:', error);
  }
}

receiveOrderMail();