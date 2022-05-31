const Post = require('../models/posts')
const User = require('../models/users')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

/**
 * [GET] Get post data
 * all posts, keyword search, pagination search
 */
exports.getPostsHandler = async (req, res, next) => {
  const { query } = req

  // If params hasn't Id, have to give pagination query. (pageSize, currentPage)
  if (query.pageSize && query.currentPage) {
    const sort = query.descending ? -1 : 1
    // Keywords search
    if (query.keyword) {
      const posts = await Post
        .find({ content: { $regex: query.keyword } })
        .skip(query.pageSize * (query.currentPage - 1))
        .limit(query.pageSize)
        .sort({ createdAt: sort })
        .populate({
          path: 'user',
          select: 'username avatar'
        })

      successHandler(
        res,
        200,
        posts,
        `Get posts successfully`,
        {
          total: posts.length,
          pageSize: Number(query.pageSize),
          currentPage: Number(query.currentPage)
        }
      )
    }
    // No keywords search
    else {
      const count = await Post.count({})
      const posts = await Post
        .find()
        .skip(query.pageSize * (query.currentPage - 1))
        .limit(query.pageSize)
        .sort({ createdAt: sort })
        .populate({
          path: 'user',
          select: 'username avatar'
        })

      successHandler(
        res,
        200,
        posts,
        `Get posts successfully`,
        {
          total: count,
          pageSize: Number(query.pageSize),
          currentPage: Number(query.currentPage)
        }
      )
    }
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
      .populate({
        path: 'user',
        select: 'username avatar'
      })
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
