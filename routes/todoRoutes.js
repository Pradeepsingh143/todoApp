const express = require('express');
const {
    home,
    todoCreate,
    getTodo,
    editTodo,
    deleteTodo,
    createTask,
    editTask,
    getTask,
    deleteTask,
} = require('../controllers/todoControllers')
const router = express.Router();

router.get('/', home);
router.post('/todoCreate', todoCreate)
router.get('/getTodo', getTodo)
router.put('/editTodo/:id', editTodo)
router.delete('/deleteTodo/:id', deleteTodo)
router.post('/createTask/:id/', createTask)
router.get('/getTask/:id', getTask)
router.put('/editTask/:id', editTask)
router.delete('/deleteTask/:id', deleteTask)

module.exports = router