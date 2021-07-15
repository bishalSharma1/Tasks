const express = require('express')
const controllers = require('../controllers/tasks.js')

const router = express.Router()

router.route('/').get(controllers.getAllTasks).post(controllers.createTask)
router
  .route('/:id')
  .get(controllers.getSingleTask)
  .patch(controllers.changeSingleTask)
  .delete(controllers.deleteTask)

module.exports = router
