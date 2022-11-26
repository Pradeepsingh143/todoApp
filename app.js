require('dotenv').config()
require('./config/connect').connect()
const express = require('express');
const todoRouter = require('./routes/todoRoutes')
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/', todoRouter)


module.exports = app