const Task = require('../models/task.js')
const asyncWrapper = require('../middleware/async.js')
const { customError } = require('../errors/customError.js')

const getAllTasks = asyncWrapper(async (req, res) => {
  const all = await Task.find()
  res.status(200).json(all)
})

const createTask = asyncWrapper(async (req, res) => {
  const singleTask = await Task.create(req.body)
  res.status(201).json(singleTask)
  console.log('Task Created')
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params
  const task = await Task.findOne({ _id: taskID })
  if (!task) {
    return next(customError('task not found', 404))
  }
  res.status(200).json({ info: 'task found', taskname: task.name })
})

const changeSingleTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id
  const changedTask = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  if (!changedTask) {
    return next(customError('task not found', 404))
  }
  console.log('changed')
  res.status(200).json({
    info: 'task changed',
    changedName: changedTask.name,
    status: changedTask.completed,
  })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id
  const deletedTask = await Task.findOneAndDelete({ _id: taskID })
  if (!deletedTask) {
    return next(customError('task not found', 404))
  }
  res.status(200).json({ message: 'task deleted' })
})

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  changeSingleTask,
  deleteTask,
}
