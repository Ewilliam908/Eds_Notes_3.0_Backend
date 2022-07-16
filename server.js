// DEPENDENCIES
const express = require('express')
const app = express()
const { Sequelize } = require('sequelize')
const users = require('./controllers/users_controller')

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// CONTROLLERS  
const usersController = require('./controllers/users_controller')
app.use('/users', usersController)

const tasksController = require('./controllers/tasks_controller')
app.use('/tasks', tasksController)

const stagesController = require('./controllers/stages_controller')
app.use('/stages', stagesController)

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`Getting life together on port: ${process.env.PORT}`)
})