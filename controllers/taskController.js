const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// get all
const getTasks = async (req, res) => {
    const {createdBy}  = req.params
    const tasks = await Task.find({ createdBy }).sort({createdAt: -1})

    res.status(200).json(tasks)
}

// get a single
const getTask = async (req, res) => {
    const {createdBy} = req.params

    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //     return res.status(404).json({error: 'INVALID ID'})
    // }

    const task = await Task.find({createdBy: createdBy}).sort({createdAt: -1})

    if (!task) {
        return res.status(404).json({error: "NOT FOUND"})
    }

    res.status(200).json(task)
}


// post a single
const createTask = async (req, res) => {
    const {title, description, dueDate, priority, status, createdBy} = req.body

    try {
        const task = await Task.create({title, description, dueDate, priority, status, createdBy})
        res.status(200).json(task)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete
const deleteTask = async (req, res) => {
    const {id}  = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'INVALID ID'})
    }

    const task = await Task.findOneAndDelete({_id: id})

    if (!task) {
        return res.status(404).json({error: "NOT FOUND"})
    }

    res.status(200).json(task)
}

//update
const updateTask = async (req, res) => {
    const {id}  = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'INVALID ID'})
    }

    const task = await Task.findByIdAndUpdate({_id:id}, {
        ...req.body
    })

    if (!task) {
        return res.status(404).json({error: "NOT FOUND"})
    }

    res.status(200).json(task)
}


module.exports = {
    getTask,
    getTasks,
    createTask,
    deleteTask,
    updateTask
}