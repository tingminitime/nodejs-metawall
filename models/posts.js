const mongoose = require('mongoose')
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')

const { Schema } = mongoose
dayjs.extend(utc)
dayjs.extend(timezone)

const schemaOptions = {
  collection: 'posts',
  versionKey: false,
}

// Ref collection schema
const user = {
  ref: 'users',
  type: Schema.Types.ObjectId,
  required: [true, 'user is required.'],
}

const postSchema = new Schema({
  user,
  tags: {
    type: [String],
    default: undefined,
    validate: {
      validator: (v) => {
        if (Array.isArray(v) && v.length === 0) return false
        else if (v.some(text => text === '')) return false
        else return true
      },
      message: `Invalid tags format.`
    },
    required: [true, `'tags' is required`]
  },
  type: {
    type: String,
    enum: ['group', 'person']
  },
  image: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: [true, `'content' is required.`]
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAtTW: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  },
}, schemaOptions)

const Post = mongoose.model('posts', postSchema)

module.exports = Post
