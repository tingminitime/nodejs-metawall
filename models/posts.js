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
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}

const postSchema = new Schema({
  // Ref fields
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: [true, 'user is required.'],
  },
  likes: {
    ref: 'users',
    type: [Schema.Types.ObjectId],
    default: []
  },
  // No ref fields
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  createdAtTW: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  },
}, schemaOptions)

// Virtual field
postSchema.virtual('comments', {
  ref: 'postComments',
  foreignField: 'post',
  localField: '_id',
})

postSchema.virtual('commentsCount', {
  ref: 'postComments',
  foreignField: 'post',
  localField: '_id',
  count: true
})

const Post = mongoose.model('posts', postSchema)

module.exports = Post
