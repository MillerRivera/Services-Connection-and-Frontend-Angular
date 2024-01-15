const TokenModel = require('../models/tokenModel');

class SecurityController {
  constructor() {
    this.tokenModel = new TokenModel();
  }

  async generateToken(request, h) {
    try {
      const token = await this.tokenModel.generateToken();
      return { token };
    } catch (error) {
      console.error('Error generando el token:', error);
      return h.response('Error interno del servidor').code(500);
    }
  }

  async validateToken(request, h) {
    try {
      const { token } = request.payload;
      const valid = await this.tokenModel.validateToken(token);
      return { valid };
    } catch (error) {
      console.error('Error validando el token:', error);
      return h.response('Error interno del servidor').code(500);
    }
  }
}

module.exports = SecurityController;
