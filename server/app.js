require('dotenv').config()
require('./config/connect').connect()
const express = require('express');
const cors = require('cors')
const todoRouter = require('./routes/todoRoutes')
const userRoutes = require("./routes/userRoutes")

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/', userRoutes)
app.use('/api/', todoRouter)


module.exports = app