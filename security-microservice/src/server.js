const Hapi = require("@hapi/hapi");
const cors = require('hapi-cors');
const config = require("./config");
const securityRoutes = require("./routes/securityRoutes");

const init = async () => {
  const server = Hapi.server(config.server);

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Security Microservice :D ";
    },
  });
  server.route(securityRoutes);

  await server.start();
  console.log("Running server to: ", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
