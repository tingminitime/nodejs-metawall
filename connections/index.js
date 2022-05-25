const mongoose = require('mongoose')

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