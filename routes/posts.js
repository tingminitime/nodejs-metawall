const express = require('express')
const PostController = require('../controllers/posts')
const mw = require('../middleware')
const setSwagger = require('../swagger/config')

const router = express.Router()

/**
 * Get posts
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.get(
  '/posts',
  setSwagger.getPosts,
  mw.catchAsync(PostController.getPostsHandler)
)

/**
 * Get single post
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.get(
  '/post/:postId',
  setSwagger.getSinglePost,
  mw.catchAsync(PostController.getSinglePostHandler)
)

/**
 * Create a post with post id
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.post(
  '/post',
  setSwagger.createPost,
  mw.catchAsync(PostController.createPostHandler)
)

/**
 * Delete all posts
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.delete(
  '/posts',
  setSwagger.deleteAllPosts,
  mw.catchAsync(PostController.deleteAllPostsHandler)
)

/**
 * Delete a post with post id
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.delete(
  '/post/:postId',
  setSwagger.deleteSinglePost,
  mw.catchAsync(PostController.deleteSinglePostHandler)
)

/**
 * Update a post with post id
 * @param {string} path - router path
 * @param {function} swagger - set swagger config
 * @param {function} exception - run request controller and catch error
 */
router.patch(
  '/post/:postId',
  setSwagger.updatePost,
  mw.catchAsync(PostController.updatePostHandler)
)

module.exports = router