const Task = require('../models/task.js')

const getAllTasks = async (req, res) => {
  try {
    const all = await Task.find()
    res.status(200).json(all)
  } catch (error) {
    res.json(error)
  }
}

const createTask = async (req, res) => {
  try {
    const singleTask = await Task.create(req.body)
    res.status(201).json({ singleTask })
    console.log('Task Created')
  } catch (error) {
    res.status(500).json(error)
  }
}

const getSingleTask = async (req, res) => {
  try {
    const { id: taskID } = req.params
    const task = await Task.findOne({ _id: taskID })
    if (!task) {
      return res.status(500).send('task not found')
    }
    res.status(200).json(task)
  } catch (error) {
    res.status(500).json(error)
  }
}

const changeSingleTask = async (req, res) => {
  try {
    const taskID = req.params.id
    const changedTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    })
    if (!changedTask) {
      return res.status(500).send('task not found')
    }
    console.log('changed')
    res.status(200).json(changedTask)
  } catch (error) {
    console.log(error)
  }
}

module.exports = { getAllTasks, createTask, getSingleTask, changeSingleTask }
