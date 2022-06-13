const mongoose = require('mongoose')
const validator = require('validator')
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

const likes = {
  ref: 'users',
  type: [Schema.Types.ObjectId],
  default: []
}

const postSchema = new Schema({
  user,
  tags: {
    type: [String],
    default: [],
    validate: {
      validator: (v) => {
        if (v.some(text => text === '')) return false
        else return true
      },
      message: `Invalid tags format.`
    },
  },
  type: {
    type: String,
    enum: ['group', 'person'],
    required: [true, `'type' is required.`]
  },
  image: {
    type: String,
    default: undefined,
    validate: {
      validator: (v) => {
        const imageRegex = /\.(jpe?g|png|gif)$/i
        if (v) {
          return validator.isURL(v) && imageRegex.test(v)
        }
        return true
      },
      message: `'image' must be a valid url and extension must be 'jpg', 'jpeg', 'png', 'gif'`
    }
  },
  content: {
    type: String,
    required: [true, `'content' is required.`]
  },
  likes,
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
