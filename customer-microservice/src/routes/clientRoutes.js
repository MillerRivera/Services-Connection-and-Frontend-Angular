const ClientController = require('../controllers/clientController');
const clientController = new ClientController();
const Joi = require('joi');

module.exports = [
  {
    method: 'POST',
    path: '/register-client',
    handler: clientController.registerClient.bind(clientController),
    options: {
      validate: {
        payload: Joi.object({
          token: Joi.string().required(),
          clientData: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phone: Joi.string().required()
          }).required()
        }).required()
      }
    }
  },
  {
    method: 'GET',
    path: '/get-parameters',
    handler: clientController.registerGlobalParameters.bind(clientController)
  },
];