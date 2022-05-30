const express = require('express')
const PostController = require('../controllers/posts')
const mw = require('../middleware')

// Middleware - common
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
 * Create a post with post id
 */
router.post(
  '/post',
  setSwagger.createPost, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(PostController.createPostHandler)
)

/**
 * Delete all posts
 */
router.delete(
  '/posts',
  setSwagger.deleteAllPosts, // set swagger config
  mw.catchAsync(PostController.deleteAllPostsHandler)
)

/**
 * Delete a post with post id
 */
router.delete(
  '/post/:postId',
  setSwagger.deleteSinglePost, // set swagger config
  mw.catchAsync(PostController.deleteSinglePostHandler)
)

/**
 * Update a post with post id
 */
router.patch(
  '/post/:postId',
  setSwagger.updatePost, // set swagger config
  mw.catchAsync(PostController.updatePostHandler)
)

module.exports = router