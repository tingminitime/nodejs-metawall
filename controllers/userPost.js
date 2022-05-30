const Post = require('../models/posts')
const User = require('../models/users')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

/**
 * [PATCH] Update single post
 */
exports.updateUserPostHandler = async (req, res, next) => {
  const { postId } = req.params
  const { content, image, tags, type } = req.body

  if (!content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  const updatePost = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      content,
      tags,
      type,
      image
    },
    { new: true, runValidators: true }
  ).populate({
    path: 'user',
    select: 'username avatar'
  })

  if (updatePost) {
    successHandler(
      res,
      200,
      updatePost,
      `Update the post successfully.`
    )
  } else {
    errorHandler(res, 400, `Cannot find the post by this Id or connect error.`)
  }
}