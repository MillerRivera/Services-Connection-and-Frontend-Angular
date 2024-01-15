const ClientModel = require("../models/clientModel");
const GlobalParametersModel = require("../models/globalParametersModel");
const {
  validateTokenWithSecurityMicroservice,
} = require("../services/securityService");
const RabbitmqService = require("../services/rabbitmqService");
const RedisService = require("../services/redisService");
const queueName = "email_queue";
const send_email_redis_parameter = "send_email";
const redis_parameter_active = 1;

class ClientController {
  constructor() {
    this.ClientModel = new ClientModel();
    this.globalParametersModel = new GlobalParametersModel();
  }

  async registerGlobalParameters(request, h) {
    console.log("automatic register");
    const result = await this.globalParametersModel.getAll();
    

    result.forEach(async (param) => {
      await RedisService.set(param.parameter_name, param.parameter_value);
    });

    return result;
  }

  async registerClient(request, h) {
    try {
      const { token, clientData } = request.payload;

      const securityValidationResponse =
        await validateTokenWithSecurityMicroservice(token);

      if (securityValidationResponse.valid) {
        const sendEmailActive = await RedisService.get(
          send_email_redis_parameter
        );

        if (sendEmailActive == redis_parameter_active) {
          const message = JSON.stringify(clientData);
          await RabbitmqService.sendMessageToQueue(queueName, message);
        }

        await this.ClientModel.registerClient(clientData);

        return { success: true, clientData };
      } else {
        return { success: false, message: "Token inválido" };
      }
    } catch (error) {
      console.error("Error al registrar el correo:", error);
      return h.response("Error interno del servidor").code(500);
    }
  }
}

module.exports = ClientController;
