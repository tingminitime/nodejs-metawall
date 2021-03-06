const express = require('express')
const PostController = require('../controllers/posts')

// Middleware - common
const mw = require('../middleware')
const setSwagger = require('../middleware/swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')

// Middleware - validations
const commentInspect = require('../middleware/posts/comment')

const router = express.Router()

/**
 * Get posts
 */
router.get(
  '/posts',
  setSwagger.getPosts,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.getPostsHandler)
)

/**
 * Get single post
 */
router.get(
  '/post/:postId',
  setSwagger.getSinglePost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.getSinglePostHandler)
)

/**
 * Like a post
 */
router.post(
  '/post/like/:postId',
  setSwagger.likePost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.likePostHandler)
)

/**
 * Cancel like to the post
 */
router.delete(
  '/post/like/:postId',
  setSwagger.cancelLikePost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.cancelLikePostHandler)
)

/**
 * Leave a comment to the post
 */
router.post(
  '/post/comment/:postId',
  setSwagger.commentPost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(commentInspect.validateFormat),
  mw.catchAsync(PostController.commentPostHandler)
)

/**
 * Delete all posts
 */
router.delete(
  '/posts',
  setSwagger.deleteAllPosts,
  mw.catchAsync(PostController.deleteAllPostsHandler)
)

module.exports = router