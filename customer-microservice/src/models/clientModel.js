const mysql = require('mysql2/promise');
const config = require('../config');

class ClientModel {
  constructor() {
    this.init();
  }

  async init() {
    try {
      this.dbConnection = await mysql.createConnection(config.database);
    } catch (error) {
      throw error;
    }
  }

  async registerClient(clientData) {
    try {
      const [result] = await this.dbConnection.query(
        'INSERT INTO clients (name, email, phone) VALUES (?, ?, ?)',
        [clientData.name, clientData.email, clientData.phone]
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ClientModel;