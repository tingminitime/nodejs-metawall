const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const boolParser = require('express-query-boolean');
const logger = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const { errorHandler } = require('./utils/responseHandler')

// Register env config
dotenv.config({ path: './config.env' })

// --- START: MongoDB connection setting ---
let mongodbURI = process.env.DATABASE_DEV
if (process.env.NODE_ENV === 'production') {
  mongodbURI = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
  )
}

const mongodbConnectionOptions = {
  serverSelectionTimeoutMS: 5000,
}

mongoose.connect(mongodbURI, mongodbConnectionOptions)
  .then(() => console.log('資料庫連線成功'))
  .catch(error => console.error('資料庫連線失敗: ', error))

// --- END: MongoDB connection setting ---

// Router
const postsRouter = require('./routes/posts')

// Express Instance
const app = express()

// app setting
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(boolParser())
app.use(express.static(path.join(__dirname, 'public')))

// Route setting
app.use('/posts', postsRouter)

// 404 Handler
app.use(function (req, res, next) {
  errorHandler(res, 404, `Invalid request path.`)
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  errorHandler(
    res,
    err.status || 500,
    `Server Error or Invalid Request.`
  )
})

console.log(process.env.NODE_ENV)

module.exports = app
