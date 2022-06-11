const express = require('express')
const PostController = require('../controllers/posts')

// Middleware - common
const mw = require('../middleware')
const setSwagger = require('../middleware/swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')

const router = express.Router()

/**
 * Get posts
 */
router.get(
  '/posts',
  setSwagger.getPosts, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.getPostsHandler)
)

/**
 * Get single post
 */
router.get(
  '/post/:postId',
  setSwagger.getSinglePost, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.getSinglePostHandler)
)

/**
 * Delete all posts
 */
router.delete(
  '/posts',
  setSwagger.deleteAllPosts, // set swagger config
  mw.catchAsync(PostController.deleteAllPostsHandler)
)

module.exports = router