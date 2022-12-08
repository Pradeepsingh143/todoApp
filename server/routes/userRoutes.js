const express = require('express');
const {createUser} = require('../controllers/userController/createUser')
const {getUserTodos} = require('../controllers/userController/getUserTodo')
const router = express.Router();

router.post('/createUser', createUser)
router.get('/todos', getUserTodos)


module.exports = router