const amqp = require('amqplib');
const config = require("../config");

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(config.rabbitmq);
    const channel = await connection.createChannel();
    return { connection, channel };
  } catch (error) {
    throw new Error(`Error connecting to RabbitMQ: ${error.message}`);
  }
};

const sendMessageToQueue = async (queueName, message) => {
  try {
    const { connection, channel } = await connectToRabbitMQ();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`Sent message to RabbitMQ queue '${queueName}': ${message}`);
    setTimeout(() => {
      connection.close();
    }, 1000);
  } catch (error) {
    throw new Error(`Error sending message to RabbitMQ: ${error.message}`);
  }
};

module.exports = { sendMessageToQueue };