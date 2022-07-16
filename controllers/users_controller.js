// DEPENDENCIES
const users = require('express').Router()
const db = require('../models')
const { Band, MeetGreet, SetTime, Event } = db 
const { Op } = require('sequelize')

// FIND ALL Users
users.get('/', async (req, res) => {
    try {
        const foundUsers = await users.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` }
            }
        })
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A USER
users.get('/:name', async (req, res) => {
    try {
        const foundUsers = await users.findOne({
            where: { name: req.params.name },
            include: [
                { 
                    model: users,
                    as: "name", 
                    attributes: { exclude: ["users_id", "users_id"] },
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

// CREATE A USER
users.post('/', async (req, res) => {
    try {
        const newUsers = await users.create(req.body)
        res.status(200).json({
            message: 'Successfully created a new user',
            data: newUsers
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A USER
users.put('/:id', async (req, res) => {
    try {
        const updatedUsers = await users.update(req.body, {
            where: {
                users_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedUsers} users(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A BAND
users.delete('/:id', async (req, res) => {
    try {
        const deletedUsers = await users.destroy({
            where: {
                users_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedUsers} users(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = users