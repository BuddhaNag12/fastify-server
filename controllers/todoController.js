const todoModel = require("../models/todoModel");

async function getAllTodos(fastify, opts, done) {
  fastify.get("/", async (req, reply) => {
    try {
      const data = await todoModel.find();
      reply.status = 200;
      reply.send(data);
      done();
    } catch (error) {
      reply.status(400);
      reply.send({
        error: error,
      });
      done();
    }
  });
  done();
}
async function addTodo(fastify, opts, done) {
  fastify.post("/add", async (req, res) => {
    const { title, done } = req.body;

    const todoTask = new todoModel({
      title,
      done,
    });
    try {
      await todoTask.save();
      res.send({
        message: "success",
      });
      // res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send({
        message: error,
      });
    }
  });
  done();
}
async function updateTodo(fastify, opts, done) {
  fastify.put("/update/:id", async (req, reply) => {
    try {
      const id = req.params.id;
      const data = todoModel.findByIdAndUpdate(
        id,
        { title: req.body.title, done: req.body.done },
        (err, doc) => {
          return err || doc;
        }
      );
      reply.send({
        message: data,
      });
    } catch (error) {
      reply.send({
        message: error,
      });
    }
  });
  done();
}

async function deleteTodo(fastify, opts, done) {
  fastify.delete("/delete/:id", async (req, reply) => {
    try {
      const id = req.params.id;
       await todoModel.findByIdAndDelete(id, (err, doc) => {
        return err || doc;
      });
      reply.send({
        message:'successfully deleted ->'+id,
      });
    } catch (error) {
      reply.send({
        error,
      });
    }
  });
  done();
}

async function viewTodo(fastify, opts, done) {
  fastify.get("/todo/:id", async (req, reply) => {
    try {
      const id = req.params.id;
      const data = await todoModel.findById(id);
      reply.send({
        data,
      });
    } catch (error) {
      reply.status(400);
      reply.send({
        error: error,
      });
    }
  });
  done();
}

module.exports = {
  getAllTodos,
  deleteTodo,
  updateTodo,
  viewTodo,
  addTodo
};
