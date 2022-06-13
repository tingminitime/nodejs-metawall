const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { Schema } = mongoose

const schemaOptions = {
  collection: 'users',
  versionKey: false,
  timestamps: true,
}

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, `name is required.`],
  },
  email: {
    type: String,
    required: [true, `email is required.`],
    unique: true, // email must be unique.
    match: /.+\@.+\..+/,
    lowercase: false,
    select: false, // Do not show the important user info.
  },
  password: {
    type: String,
    required: [true, `password is required.`],
    minlength: 8,
    select: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  sex: {
    type: String,
    enum: ['male', 'female'],
    default: '',
  },
  following: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    createdAtTw: {
      type: String,
      default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
    },
  }],
  followers: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
    createdAtTw: {
      type: String,
      default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
    },
  }],
  createdAtTw: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  },
  lastUpdatedPasswordAtTW: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  }
}, schemaOptions)

const User = mongoose.model('users', userSchema)

module.exports = User