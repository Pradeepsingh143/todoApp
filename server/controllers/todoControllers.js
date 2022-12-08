const Todo = require("../models/todoModel");
const User = require("../models/userModel");

exports.home = (req, res) => {
  res.status(201).send("hello routes");
};

exports.todoCreate = async (req, res) => {
  try {
    const { title, task, userId } = req.body;
    if (!(title && task && userId)) {
      throw new Error("All feilds are required");
    }

    const user = await User.find({ appwriteId: userId });
    const existTodo = await Todo.find({ title });

    if (!user) {
      throw new Error("User not found in DB");
    }

    if (existTodo) {
      const currentUser = user[0]._id.toString();
      existTodo.map((todo) => {
        const todoUser = todo.user.toString();
        if (todoUser === currentUser) {
          throw new Error("This todo is already in List");
        }
      });
    }

    // create todo in db
    const todo = await Todo.create({ title, task, user: user[0]._id });

    if (!user[0].todos) {
      user[0].todos = [todo._id];
    } else {
      user[0].todos.push(todo._id);
    }

    user[0].save();

    res.status(201).json({
      success: true,
      message: "todo created successfully",
      todo,
      user: user[0],
    });
  } catch (error) {
    res.status(401).send(`Error: ${error.message}`);
  }
};

exports.editTodo = async (req, res) => {
  try {
    const { title, task } = req.body;
    const { todoId } = req.params;
    if (!(title || task)) {
      res.status(401);
      throw new Error("Require some changes");
    }

    if (!todoId) {
      throw new Error("Todo id is required");
    }

    const todoExist = await Todo.findOne({ title });
    if (todoExist) {
      throw new Error("Todo already exist in db");
    }

    await Todo.findByIdAndUpdate(todoId, { title, task });
    res.status(201).json({
      success: true,
      message: "Todo updated successfully",
    });
  } catch (error) {
    res.status(401).send(`Error: ${error.message}`);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { todoId, userId } = req.params;
    const todo = await Todo.findByIdAndDelete(todoId);
    const user = await User.find({ appwriteId: userId });

    if (!todo) {
      throw new Error("Todo not found");
    }

    if (!user[0]) {
      throw new Error("User not found");
    }

    user[0].todos = user[0].todos.filter(
      (todoArr) => todoArr.equals(todo._id) === false
    );

    await user[0].save();

    res.status(201).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    res.send(401).send(`Error: ${error.message}`);
    console.log(error);
  }
};

exports.createTask = async (req, res) => {
  try {
    const { task } = req.body;
    const myTask = await Todo.findById(req.params.todoId);
    if (myTask.task.includes(task)) {
      res.status(400).send(`Error task is already in list`);
    } else {
      myTask.task.push(task);
      myTask.save();

      res.status(201).json({
        success: true,
        message: "task created successfully",
        myTask,
      });
    }
  } catch (error) {
    res.send(401).send(`Error: ${error.message}`);
  }
};

exports.getTask = async (req, res) => {
  try {
    const { todoId } = req.params;
    if (!todoId) {
      throw new Error("TodoId is required");
    }

    const myTask = await Todo.find({ _id: todoId });
    res.status(201).json({
      success: true,
      myTask,
    });
  } catch (error) {
    res.send(401).send(`Error: ${error.message}`);
  }
};

exports.editTask = async (req, res) => {
  try {
    const { task } = req.body;
    const { id } = req.params;
    const { index } = req.query;
    if (!task) {
      res.status(400);
      throw new Error("Require Some Changes");
    }

    if (!id) {
      res.status(400);
      throw new Error("Todo id is required");
    }

    if (!index) {
      res.status(400);
      throw new Error("someThing went wrong index doesn't fetched");
    }

    const myTask = await Todo.findById(id);
    myTask.task.splice(index, 1, task);
    myTask.save();

    res.status(201).json({
      success: true,
      message: "task created successfully",
      myTask,
    });
  } catch (error) {
    res.send(401).send(`Error: ${error.message}`);
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const {index} = req.query
    const myTask = await Todo.findById(id);
    if (!(id && index && myTask)) {
      res.status(401).send("Todo id not found");
    }
   else {
      myTask.task.splice(index, 1);
      myTask.save();

      res.status(201).json({
        success: true,
        message: "task created successfully",
        myTask,
      });
    }
  } catch (error) {
    res.send(401).send(`Error: ${error.message}`);
  }
};
