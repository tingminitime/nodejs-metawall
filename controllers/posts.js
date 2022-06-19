const Post = require('../models/posts')
const User = require('../models/users')
const PostComment = require('../models/comments')
// const UserActivity = require('../models/userActivities')
const dayjs = require('dayjs')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

/**
 * [GET] Get post data
 * all posts, keyword search, pagination search
 */
exports.getPostsHandler = async (req, res, next) => {
  const { pageSize, currentPage, descending, keyword } = req.query

  // If params hasn't Id, have to give pagination query. (pageSize, currentPage)
  if (pageSize && currentPage) {
    const sort = descending ? -1 : 1
    const findConditions = {}
    let count = undefined
    // Keywords search
    if (keyword) {
      count = await Post.count({})
      findConditions.content = { $regex: keyword }
    }
    const posts = await Post
      .find(findConditions)
      .skip(pageSize * (currentPage - 1))
      .limit(pageSize)
      .sort({ createdAt: sort })
      .populate([
        {
          path: 'user',
          select: 'username avatar'
        },
        {
          path: 'likes',
          select: 'username avatar'
        },
        {
          path: 'comments',
          select: 'user comment createdAtTw'
        },
        {
          path: 'commentsCount'
        },
      ])

    successHandler(
      res,
      200,
      posts,
      `Get posts successfully`,
      {
        total: keyword ? count : posts.length,
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

/**
 * [GET] Get single post data
 */
exports.getSinglePostHandler = async (req, res, next) => {
  const { params } = req

  // If params has Id, return single post data
  if (params.postId) {
    const post = await Post
      .findById(params.postId)
      .populate([
        {
          path: 'user',
          select: 'username avatar'
        },
        {
          path: 'likes',
          select: 'username avatar'
        },
        {
          path: 'comments',
          select: 'user comment createdAtTw'
        },
        {
          path: 'commentsCount'
        },
      ])
    // Maybe mongoDB will return success message but null result
    if (post) {
      successHandler(res, 200, post)
    } else {
      errorHandler(
        res,
        404,
        `Cannot find the post by this Id.`
      )
    }
  } else {
    errorHandler(
      res,
      400,
      `Ensure that the query has 'pageSize' and 'currentPage'.`
    )
  }
}

/**
 * [POST] Like a post
 */
exports.likePostHandler = async (req, res, next) => {
  const { postId } = req.params
  const userId = req.userId

  const likedPost = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $addToSet: {
        likes: userId,
      },
    },
    { new: true, runValidators: true }
  ).populate({
    path: 'user',
    select: 'username avatar'
  }).populate({
    path: 'likes',
    select: 'username avatar'
  })

  if (likedPost) {
    likedPost._doc.likesCount = likedPost.likes.length
    successHandler(
      res,
      201,
      likedPost,
      `Like this post (${likedPost._id}) successfully.`
    )
  } else {
    errorHandler(res, 400, `Cannot find the post by this Id or connect error.`)
  }
}

/**
 * [DELETE] Cancel like to the post
 */
exports.cancelLikePostHandler = async (req, res, next) => {
  const { postId } = req.params
  const userId = req.userId

  const cancelLikePost = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $pull: { likes: userId }
    },
    { new: true, runValidators: true }
  ).populate({
    path: 'user',
    select: 'username avatar'
  }).populate({
    path: 'likes',
    select: 'username avatar'
  })

  if (cancelLikePost) {
    cancelLikePost._doc.likesCount = cancelLikePost.likes.length
    successHandler(
      res,
      200,
      cancelLikePost,
      `Cancel like of this post (${cancelLikePost._id}) successfully.`
    )
  } else {
    errorHandler(res, 400, `Cannot find the post by this Id or connect error.`)
  }
}

/**
 * [POST] Add a comment
 */
exports.commentPostHandler = async (req, res, next) => {
  // PostComment
  const { comment } = req.body
  const userId = req.userId
  const postId = req.params.postId

  const user = await User.exists({ _id: userId })
  if (!user) throw new Error(`The userId does not exist.`)

  const post = await Post.exists({ _id: postId })
  if (!post) throw new Error(`The postId does not exist.`)

  const newComment = await PostComment.create({
    user: userId,
    post: postId,
    comment
  })

  successHandler(
    res,
    201,
    newComment,
    `Create post comment successfully.`
  )
}

/**
 * [DELETE] Delete all post data
 */
exports.deleteAllPostsHandler = async (req, res, next) => {
  const data = await Post.deleteMany({})
  successHandler(
    res,
    200,
    [],
    `Delete all posts successfully.`,
    {
      ...data
    }
  )
}
