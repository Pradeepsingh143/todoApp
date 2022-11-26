const todo = require('../models/todoModel')

exports.home = (req, res) => {
    res.status(201).send("hello routes")
}

exports.todoCreate = async (req, res) => {
    try {
        const { title, task } = req.body
        if (!(title && task)) {
            throw new Error("All feilds are required")
        }
        const existTodo = await todo.findOne({ title });

        if (existTodo) {
            throw new Error("This todo is already in List")
        }

        // create todo in db
        const Todo = await todo.create({ title, task });
        Todo.save()
        res.status(201).json({
            success: true,
            message: "todo created successfully",
            Todo,
        })
    } catch (error) {
        res.status(401).send(`Error: ${error.message}`)
    }
}

exports.getTodo = async (req, res) => {
    try {
        const todos = await todo.find()
        res.status(201).json({
            success: true,
            todos,
        })
    } catch (error) {
        res.status(401).send(`Error ${error.message}`)
    }
}

exports.editTodo = async (req, res) => {
    try {
        const { title, task } = req.body
        if (!(title || task)) {
            res.status(401)
            throw new Error("Require some changes")
        }

        const editTodo = await todo.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success: true,
            message: "Todo updated successfully",
            editTodo,
        })

    } catch (error) {
        res.status(401).send(`Error: ${error.message}`)
    }
}

exports.deleteTodo = async (req, res) => {
    try {
        const deletetodo = await todo.findByIdAndDelete(req.params.id)
        res.status(201).json({
            success: true,
            message: "user deleted successfully",
        })
    } catch (error) {
        res.send(401).send(`Error: ${error.message}`)
    }
}

exports.createTask = async (req, res) => {
    try {
        const { task } = req.body
        const myTask = await todo.findById(req.params.id);
        myTask.task.push(task)
        myTask.save()

        res.status(201).json({
            success: true,
            message: "task created successfully",
            myTask,
        })
    } catch (error) {
        res.send(401).send(`Error: ${error.message}`)
    }
}

exports.getTask = async (req, res) => {
    const getTask = await todo.findById(req.params.id)
    res.status(201).json({
        success: true,
        getTask
    })
}

exports.editTask = async (req, res) => {
    try {
        const { task } = req.body
        const myTask = await todo.findById(req.params.id);
        myTask.task.splice(req.query.index, 1, task)
        myTask.save()

        res.status(201).json({
            success: true,
            message: "task created successfully",
            myTask,
        })
    } catch (error) {
        res.send(401).send(`Error: ${error.message}`)
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const myTask = await todo.findById(req.params.id);
        myTask.task.splice(req.query.index, 1)
        myTask.save()

        res.status(201).json({
            success: true,
            message: "task created successfully",
            myTask,
        })
    } catch (error) {
        res.send(401).send(`Error: ${error.message}`)
    }
}