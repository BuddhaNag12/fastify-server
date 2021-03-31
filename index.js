// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const routes = require("./routes/routes");
require("dotenv").config();

const port = process.env.PORT || 3000;

routes.map((route) => {
  fastify.register(route);
});

const start = async () => {
  try {
    await fastify.listen(port);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

async function build() {
  await fastify.register(require("fastify-express"));
  fastify.use(require("cors")());
  start();
  return fastify;
}
build()
  .then(() => {
    mongoConnection();
  })
  .catch(console.log);

const mongoConnection = async () => {
  try {
    await mongoose.connect(process.env.mongoApi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    throw new error;
    console.log(error);
  }
};
