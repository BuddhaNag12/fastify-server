const {
  addTodo,
  getAllTodos,
  deleteTodo,
  updateTodo,
  viewTodo,
} = require("../controllers/todoController");

module.exports = routes = [addTodo,getAllTodos, deleteTodo, updateTodo, viewTodo];