const express = require('express')
const PostController = require('../controllers/posts')
const mw = require('../middleware')

const router = express.Router()

router.get('/posts', mw.catchAsync(PostController.getPostsHandler))

router.get('/post/:postId', mw.catchAsync(PostController.getSinglePostHandler))

router.post('/post', mw.catchAsync(PostController.createNewPostHandler))

router.delete('/posts', mw.catchAsync(PostController.deleteAllPostsHandler))

router.delete('/post/:postId', mw.catchAsync(PostController.deleteSinglePostHandler))

router.patch('/post/:postId', mw.catchAsync(PostController.updatePostHandler))

module.exports = router