const Hapi = require("@hapi/hapi");
const config = require("./config");
const clientRoutes = require('./routes/clientRoutes');
const ClientController = require('./controllers/clientController');

const clientController = new ClientController();

const init = async () => {
  const server = Hapi.server(config.server);

  await clientController.registerGlobalParameters();

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Client Microservice :D ";
    },
  });
  server.route(clientRoutes);


  await server.start();
  console.log("Running server to: ", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
