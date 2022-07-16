// DEPENDENCIES
const tasks = require('express').Router()
const db = require('../models')
const { Description } = db 
const { Op } = require('sequelize')

// FIND ALL TASKS
tasks.get('/', async (req, res) => {
    try {
        const foundTasks = await tasks.findAll({
            order: [ [ 'description' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundTasks)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A TASK
tasks.get('/:description', async (req, res) => {
    try {
        const foundTasks = await tasks.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: tasks,
                    as: "name", 
                    attributes: { exclude: ["tasks_id", "tasks_id"] },
                    include: { 
                        model: Users, 
                        as: "email", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
                },
                { 
                    model: SetTime, 
                    as: "set_times",
                    attributes: { exclude: ["band_id", "event_id"] },
                    include: { 
                        model: Event, 
                        as: "event", 
                        where: { name: { [Op.like]: `%${req.query.event ? req.query.event : ''}%` } } 
                    }
                }
            ],
            order: [
                [{ model: MeetGreet, as: "meet_greets" }, { model: Event, as: "event" }, 'date', 'DESC'],
                [{ model: SetTime, as: "set_times" }, { model: Event, as: "event" }, 'date', 'DESC']
            ]
        })
        res.status(200).json(foundBand)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A TASK
tasks.post('/', async (req, res) => {
    try {
        const newTasks = await tasks.create(req.body)
        res.status(200).json({
            message: 'Successfully added new task',
            data: newTasks
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A TASK
tasks.put('/:id', async (req, res) => {
    try {
        const updatedTasks = await tasks.update(req.body, {
            where: {
                tasks_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedUsers} tasks(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A TASK
tasks.delete('/:id', async (req, res) => {
    try {
        const deletedTasks = await tasks.destroy({
            where: {
                users_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedUsers} a tasks(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = tasks