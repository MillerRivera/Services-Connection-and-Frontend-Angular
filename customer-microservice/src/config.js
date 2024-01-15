module.exports = {
  database: {
    host: "localhost",
    user: "root",
    password: "",
    database: "microservices_database",
  },
  server: {
    port: 3002,
    host: "localhost",
    "routes": {
      "cors": {
          "origin": ["http://localhost:4200"],
          "headers": ["Accept", "Content-Type"],
          "additionalHeaders": ["X-Requested-With"]
      }
    }
  },
  rabbitmq: 'amqp://localhost',
  redis: {
    host: 'localhost',
    port: 6379,
  },
  microserviceSecurityUrl: 'http://localhost:3000/validate-token'
};
