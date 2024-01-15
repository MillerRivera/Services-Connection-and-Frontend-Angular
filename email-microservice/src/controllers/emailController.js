const EmailModel = require("../models/emailModel");
const amqp = require("amqplib");
const config = require("../config");
const queueName = "email_queue";

class EmailController {
  constructor() {
    this.emailModel = new EmailModel();
  }

  async readAndSendEmail(request, h) {
    try {
      const rabbitmqConnection = await amqp.connect(config.rabbitmq);
      const channel = await rabbitmqConnection.createChannel();

      await channel.assertQueue(queueName);

      channel.consume(
        queueName,
        async (msg) => {
          const emailData = JSON.parse(msg.content.toString());
          const prepareData = {
            "recipient_email" : emailData.email,
            "subject": "Send email to :"+emailData.name,
            "message": "Test message to phone :"+emailData.phone
          }
          await this.emailModel.sendEmail(
            prepareData.recipient_email,
            prepareData.subject,
            prepareData.message
          );
          console.log(emailData);
          console.log("Email sent and recorded:", emailData);
        },
        {
          noAck: true,
        }
      );

      return ;
    } catch (error) {
      console.error("Error al registrar el correo:", error);
      return h.response("Error interno del servidor").code(500);
    }
  }
}

module.exports = EmailController;
