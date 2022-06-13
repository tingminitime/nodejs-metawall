const express = require('express')

// Controllers
const UploadController = require('../controllers/upload')

// Middleware - common
const mw = require('../middleware')
const setSwagger = require('../middleware/swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')

// Middleware - validations
const imageInspect = require('../middleware/upload/image')

const router = express.Router()

/**
 * Upload post image
 */
router.post(
  '/image',
  setSwagger.uploadImage,
  imageInspect.upload,
  imageInspect.validateImage,
  // mw.catchAsync(jwtAuth),
  mw.catchAsync(UploadController.uploadImageHandler)
)

/**
 * Upload post image
 */
router.post(
  '/avatar',
  setSwagger.uploadAvatar,
  mw.catchAsync(jwtAuth),
  imageInspect.upload,
  imageInspect.validateAvatar,
  mw.catchAsync(UploadController.uploadAvatarHandler)
)


module.exports = router