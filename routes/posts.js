const express = require('express')
const PostController = require('../controllers/posts')

const router = express.Router()

router.get('/posts', PostController.getPostsHandler)

router.get('/post/:postId', PostController.getSinglePostHandler)

router.post('/post', PostController.createNewPostHandler)

router.delete('/posts', PostController.deleteAllPostsHandler)

router.delete('/post/:postId', PostController.deleteSinglePostHandler)

router.patch('/post/:postId', PostController.updatePostHandler)

module.exports = router