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
 * [POST] Add new post data
 */
exports.createPostHandler = async (req, res, next) => {
  const reqData = req.body
  const userId = req.userId
  console.log(userId)

  if (!reqData || Object.keys(reqData).length === 0) {
    errorHandler(res, 400, `Empty request data.`)
    return
  }

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

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

/**
 * [DELETE] Delete single post data
 */
exports.deleteSinglePostHandler = async (req, res, next) => {
  const { params } = req
  if (!params.postId) {
    errorHandler(res, 400, `Delete unsuccessfully, no Id exist.`)
    return
  }

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
    `Delete one post: userId: ${deletePost.user._id} postId:${deletePost._id}`,
    {
      userId: deletePost.user._id,
      postId: deletePost._id,
    }
  )
}

/**
 * [PATCH] Update single post
 */
exports.updatePostHandler = async (req, res, next) => {
  const { params } = req
  const reqData = req.body

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  const updatePost = await Post.findByIdAndUpdate(
    { _id: params.postId },
    {
      content: reqData.content,
      tags: reqData.tags,
      type: reqData.type,
      image: reqData.image
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
