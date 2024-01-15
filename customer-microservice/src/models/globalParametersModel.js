const mysql = require('mysql2/promise');
const config = require('../config');

class GlobalParametersModel {
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

  async getAll() {
    try {
      if (!this.dbConnection) {
        await this.init();
      }
      
      const [results] = await this.dbConnection.query("SELECT * FROM global_parameters");
      return results;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = GlobalParametersModel;