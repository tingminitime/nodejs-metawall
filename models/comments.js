const mongoose = require('mongoose')
const dayjs = require('dayjs')

const { Schema } = mongoose

const schemaOptions = {
  collection: 'userActivities',
  versionKey: false,
  timestamps: true,
}

// Ref collection schema
const user = {
  ref: 'users',
  type: Schema.Types.ObjectId,
  required: [true, 'user is required.']
}

const userActivitySchema = new Schema({
  user,
  likedPosts: [{
    post: {
      type: Schema.Types.ObjectId,
      ref: 'posts',
    },
    createdAtTw: {
      type: String,
      default: () => dayjs(Date.now()).tz('Asia/Taipei').format()
    },
  }],
}, schemaOptions)

const PostComment = mongoose.model('postComments', userActivitySchema)

module.exports = PostComment