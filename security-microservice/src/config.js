module.exports = {
  database: {
    host: "localhost",
    user: "root",
    password: "",
    database: "microservices_database",
  },
  server: {
    port: 3000,
    host: "localhost",
    "routes": {
      "cors": {
          "origin": ["http://localhost:4200"],
          "headers": ["Accept", "Content-Type"],
          "additionalHeaders": ["X-Requested-With"]
      }
  }
  },
};
