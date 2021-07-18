const connectDB = require('./db/connect.js')
const express = require('express')
const app = express()
const { Mongoose } = require('mongoose')
const notFoundMiddleware = require('./middleware/notFound.js')
const tasks = require('./routes/tasks.js')
const errorHandlerMiddleware = require('./middleware/errorHandler.js')

require('dotenv').config()
const uri = process.env.MONGO_URI
const port = 3000

app.use(express.static('./public'))
app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
  try {
    await connectDB(uri)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
