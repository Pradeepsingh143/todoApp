const express = require("express");
const {
  home,
  todoCreate,
  editTodo,
  deleteTodo,
  createTask,
  editTask,
  deleteTask,
  getTask,
} = require("../controllers/todoControllers");
const router = express.Router();

router.get("/", home);
router.post("/todoCreate", todoCreate);
router.put("/editTodo/:todoId", editTodo);
router.delete("/deleteTodo/:todoId/:userId", deleteTodo);
router.get("/getTask/:todoId", getTask);
router.post("/createTask/:todoId", createTask);
router.put("/editTask/:id", editTask);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
