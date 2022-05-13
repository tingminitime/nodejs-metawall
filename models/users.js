const mongoose = require('mongoose')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

const { Schema } = mongoose
dayjs.extend(utc)
dayjs.extend(timezone)

const schemaOptions = {
  collection: 'users',
  versionKey: false,
  timestamps: true,
}

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, `name is required.`],
  },
  email: {
    type: String,
    required: [true, `Email is required.`],
    unique: true, // email must be unique.
    select: false, // Do not show the important user info.
    lowercase: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  createdAtTw: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  },
}, schemaOptions)

const User = mongoose.model('users', userSchema)

module.exports = User