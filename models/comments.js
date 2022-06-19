const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { Schema } = mongoose

const schemaOptions = {
  collection: 'postComments',
  versionKey: false,
  timestamps: true,
}

const commentSchema = new Schema({
  // Ref fields
  user: {
    ref: 'users',
    type: Schema.Types.ObjectId,
    required: [true, 'user is required.']
  },
  post: {
    ref: 'posts',
    type: Schema.Types.ObjectId,
    required: [true, `comment must belong to a post.`]
  },
  // No ref fields
  comment: {
    type: String,
    required: [true, `comment is required.`]
  },
  createdAtTw: {
    type: String,
    default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
  },
}, schemaOptions)

// If there is any method accessing DB by using start with 'find'
commentSchema.pre('/^find/', function (next) {
  this.populate({
    path: 'user',
    select: 'username avatar createdAtTw'
  })
})

const PostComment = mongoose.model('postComments', commentSchema)

module.exports = PostComment