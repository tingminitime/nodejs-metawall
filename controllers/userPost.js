const Post = require('../models/posts')
const User = require('../models/users')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

exports.createUserPostHandler = async (req, res, next) => {
  const reqData = req.body
  const userId = req.userId

  const user = await User.exists({ _id: userId })
  if (!user) throw new Error(`The userId does not exist.`)

  let newPost = await Post.create({
    user: userId,
    tags: reqData.tags,
    type: reqData.type,
    image: reqData.image,
    content: reqData.content,
  })

  newPost = await newPost.populate({
    path: 'user',
    select: 'username avatar'
  })

  successHandler(
    res,
    201,
    newPost,
    `Create post successfully.`
  )
}

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

/**
 * [DELETE] Delete single post
 */
exports.deleteUserPostHandler = async (req, res, next) => {
  const { postId } = req.params
  if (!postId) {
    errorHandler(res, 400, `Delete unsuccessfully, no Id exist.`)
    return
  }

  const deletePost = await Post.findByIdAndDelete({ _id: postId })
    .populate({
      path: 'user',
      select: 'username avatar'
    })
  if (!deletePost) throw new Error(`Cannot find the post by this Id.`)
  successHandler(
    res,
    200,
    deletePost,
    `Delete one post: userId: ${deletePost.user._id} postId:${deletePost._id}`,
    {
      userId: deletePost.user._id,
      postId: deletePost._id,
    }
  )
}

/**
 * [GET] Get user liked posts
 */
exports.getLikedPostsHandler = async (req, res, next) => {
  const { pageSize, currentPage, descending, keyword } = req.query
  const userId = req.userId

  // If params hasn't Id, have to give pagination query. (pageSize, currentPage)
  if (pageSize && currentPage) {
    const sort = descending ? -1 : 1
    const findConditions = {
      likes: { $in: [userId] }
    }
    let count = undefined
    // Keywords search
    if (keyword) {
      count = await Post.count(findConditions)
      findConditions.content = { $regex: keyword }
    }

    const likedPosts = await Post
      .find(findConditions)
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
      .sort({ createdAt: sort })
      .populate({
        path: 'user',
        select: 'username avatar'
      })

    successHandler(
      res,
      200,
      likedPosts,
      `Get user liked posts successfully`,
      {
        total: keyword ? count : likedPosts.length,
        pageSize: Number(pageSize),
        currentPage: Number(currentPage)
      }
    )
  }
  else {
    errorHandler(
      res,
      400,
      `Ensure that the query has 'pageSize' and 'currentPage'.`
    )
  }
}
