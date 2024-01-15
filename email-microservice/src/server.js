const Hapi = require("@hapi/hapi");
const config = require("./config");
const EmailController = require('./controllers/emailController');

const emailController = new EmailController();


const init = async () => {
  const server = Hapi.server(config.server);

  await emailController.readAndSendEmail();

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Email Microservice :D ";
    },
  });

  await server.start();
  console.log("Running server to: ", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.error(err);
  process.exit(1);
});

init();
