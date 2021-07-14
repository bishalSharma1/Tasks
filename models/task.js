//schema model of task

const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please enter name'],
    trim: true,
    maxlength: [20, 'name too long'],
    minlength: [1, 'name too short'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  address: {
    type: String,
    default: 'Nepal',
  },
})

module.exports = mongoose.model('Task', TaskSchema)
