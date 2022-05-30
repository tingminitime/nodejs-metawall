const Post = require('@models/posts')
const { errorHandler } = require('@utils/response')

exports.validateOwnUser = async (req, res, next) => {
  const { postId } = req.params
  const userId = req.userId
  console.log(postId, userId)

  const post = await Post.findById(postId)
  console.log('validateOwnUser post:', post)

  if (!post) {
    errorHandler(res, 400, `Cannot find the post by this Id.`)
    return
  }

  if (post.user.toString() !== userId) {
    errorHandler(res, 400, `Permission denied.`)
    return
  }

  next()
}