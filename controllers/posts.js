const Post = require('../models/posts')
const User = require('../models/users')
const { errorHandler, successHandler, schemaErrorHandler } = require('../utils/responseHandler')

/**
 * Get post data
 * all posts, single post, keyword search, pagination search
 */
exports.getPostHandler = async (req, res, next) => {
  const { params, query } = req

  // If params has Id, return single post data
  if (params.postId) {
    try {
      const post = await Post
        .findById(params.postId)
        .populate({
          path: 'user',
          select: 'userName avatar'
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
    } catch (error) {
      console.error(error)
      errorHandler(
        res,
        400,
        `Invalid Id.`
      )
    }
  }
  // If params hasn't Id, have to give pagination query. (pageSize, currentPage)
  else if (query.pageSize && query.currentPage) {
    const count = await Post.count({})
    const sort = query.descending ? -1 : 1
    // Keywords search
    if (query.keyword) {
      try {
        const posts = await Post
          .find({ content: { $regex: query.keyword } })
          .skip(query.pageSize * (query.currentPage - 1))
          .limit(query.pageSize)
          .sort({ createdAt: sort })
          .populate({
            path: 'user',
            select: 'userName avatar'
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
      } catch (error) {
        console.error(error)
        errorHandler(
          res,
          400,
          `Invalid request path or something error happened.`
        )
      }
    }
    // No keywords search
    else {
      try {
        const posts = await Post
          .find()
          .skip(query.pageSize * (query.currentPage - 1))
          .limit(query.pageSize)
          .sort({ createdAt: sort })
          .populate({
            path: 'user',
            select: 'userName avatar'
          })

        successHandler(
          res,
          200,
          posts,
          `Get posts successfully`,
          {
            total: count,
            pageSize: query.pageSize,
            currentPage: query.currentPage
          }
        )
      } catch (error) {
        console.error(error)
        errorHandler(
          res,
          400,
          `Invalid request path or something error happened.`
        )
      }
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
 * Add new post data
 */
exports.createNewPostHandler = async (req, res, next) => {
  const reqData = req.body
  if (!reqData || Object.keys(reqData).length === 0) {
    errorHandler(res, 400, `Empty request data.`)
    return
  }

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  try {
    const newPost = await Post.create({
      user: reqData.user,
      tags: reqData.tags,
      type: reqData.type,
      image: reqData.image,
      content: reqData.content,
    })

    successHandler(
      res,
      201,
      newPost,
      `Create post successfully.`
    )
  } catch (error) {
    console.error('TypeError', error)
    const errorMessage = schemaErrorHandler(error.errors)
    errorHandler(
      res,
      400,
      `Validation error.`,
      errorMessage || `Invalid data format`
    )
  }
}

/**
 * Delete all post data, or delete single post data
 */
exports.deletePostHandler = async (req, res, next) => {
  const { params } = req
  if (req.originalUrl === (req.baseUrl + '/')) {
    errorHandler(res, 404, `Delete unsuccessfully, no Id exist.`)
    return
  }

  // Delete all posts
  if (!params.postId) {
    try {
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
    } catch (error) {
      console.error(error)
      errorHandler(res, 500, `Internal server error.`)
    }
  }
  // Delete single post
  else {
    try {
      const deletePost = await Post.findByIdAndDelete({ _id: params.postId })
        .populate({
          path: 'user',
          select: 'userName avatar'
        })
      if (!deletePost) throw new Error(`Cannot find the post by this Id.`)
      successHandler(
        res,
        200,
        deletePost,
        `Delete one post: userId: ${deletePost.user} postId:${deletePost._id}`,
        {
          userId: deletePost.user,
          postId: deletePost._id,
        }
      )
    } catch (error) {
      console.error(error)
      errorHandler(res, 404, error.message || error)
    }
  }
}

/**
 * Update single post
 */
exports.updatePostHandler = async (req, res, next) => {
  const { params } = req
  const reqData = req.body

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: params.postId },
      reqData,
      { new: true, runValidators: true }
    )

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
  } catch (error) {
    console.error('TypeError', error)
    const errorMessage = schemaErrorHandler(error.errors)
    errorHandler(
      res,
      400,
      `Validation error.`,
      errorMessage || `Validation error.`
    )
  }
}
