const mysql = require("mysql2/promise");
const config = require('../config');
const crypto = require("crypto");

class TokenModel {
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

  async generateToken() {
    try {
      console.log(await this.dbConnection.connect());  
      const token = crypto.randomBytes(4).toString("hex");
      const [result] = await this.dbConnection.query(
        "INSERT INTO security_tokens (token) VALUES (?)",
        [token]
      );
      return token;
    } catch (error) {
      throw error;
    }
  }

  async validateToken(token) {
    try {
      const [rows] = await this.dbConnection.query(
        "SELECT * FROM security_tokens WHERE token = ?",
        [token]
      );
      return rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TokenModel;