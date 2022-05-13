const express = require('express')
const PostController = require('../controllers/posts')

const router = express.Router()

router.get('/:postId?', PostController.getPostHandler)
router.post('/', PostController.createNewPostHandler)
router.delete('/:postId?', PostController.deletePostHandler)
router.patch('/:postId', PostController.updatePostHandler)

module.exports = router