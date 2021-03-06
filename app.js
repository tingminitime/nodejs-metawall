const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const boolParser = require('express-query-boolean');
const logger = require('morgan')
const dotenv = require('dotenv')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const swaggerUI = require('swagger-ui-express')

dayjs.extend(utc)
dayjs.extend(timezone)
const swaggerFile_PROD = require('./swagger-output-prod.json')
const swaggerFile_DEV = require('./swagger-output-dev.json')
const mw = require('./middleware')

// Register env config
dotenv.config({ path: './config.env' })

// MongoDB connection setting
require('./connections')

// Router
const postsRouter = require('./routes/posts')
const usersRouter = require('./routes/users')
const uploadRouter = require('./routes/upload')

// Express Instance
const app = express()

// app settings
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(boolParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/utils', express.static(path.join(__dirname, '')))

// Swagger output file settings
const swaggerFile = process.env.NODE_ENV === 'production'
  ? swaggerFile_PROD
  : swaggerFile_DEV

// Route settings
app.use('/api', postsRouter)
app.use('/api/user', usersRouter)
app.use('/api/upload', uploadRouter)
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile))

// Catch 404 not found when routes above do not exist.
app.use(mw.catchNotFound)

// Error handler
app.use(mw.catchException)

// Critical error handling
process.on('uncaughtException', err => {
  console.error('UncaughtException!')
  console.error(err)
  process.exit(1)
})

// Leaked error catch handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('(Leaked catch) rejection:', promise)
  console.error('(Leaked catch) reason:', reason.message)
  process.exit(1)
})

module.exports = app
