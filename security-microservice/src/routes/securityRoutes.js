const SecurityController = require('../controllers/securityController');

const securityController = new SecurityController();

module.exports = [
  {
    method: 'GET',
    path: '/generate-token',
    handler: securityController.generateToken.bind(securityController),
  },
  {
    method: 'POST',
    path: '/validate-token',
    handler: securityController.validateToken.bind(securityController),
  },
];