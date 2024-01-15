const mysql = require('mysql2/promise');
const config = require('../config');

class EmailModel {
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

  async sendEmail(recipient_email, subject, message) {
    try {
      const [result] = await this.dbConnection.query(
        'INSERT INTO sent_emails (recipient_email, subject, message) VALUES (?, ?, ?)',
        [recipient_email, subject, message]
      );

      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = EmailModel;