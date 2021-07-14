const mongoose = require('mongoose')

const connectDB = (url) => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Connected to Database')
    })
    .catch((err) => console.log(err))
}

module.exports = connectDB
