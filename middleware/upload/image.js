const multer = require('multer')
const uploadInspection = require('@utils/validate/upload')
const { errorHandler } = require('@utils/response')

// Check file
exports.upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter(req, file, cb) {
    console.log('multer fileFilter:', file)
    if (!uploadInspection.validateImageFile(file.originalname)) {
      cb(new Error(`'image' must be a valid url and extension must be 'jpg', 'jpeg', 'png', 'gif'`))
    }
    cb(null, true)
  }
}).single('image')


// Check file exist
exports.validateImage = (req, res, next) => {
  const imageFile = req.file
  console.log('validateImage')
  if (!imageFile) {
    errorHandler(
      res,
      400,
      `'image' is empty, please select a image file.`
    )
    return
  }
  next()
}

// Check avatar exist and size
exports.validateAvatar = (req, res, next) => {
  const avatarFile = req.file
  if (!avatarFile) {
    errorHandler(
      res,
      400,
      `'image' is empty, please select a avatar file.`
    )
    return
  }

  if (!uploadInspection.validateAvatarFile(avatarFile.buffer)) {
    errorHandler(
      res,
      400,
      `Avatar must be 1:1 and larger than 256 pixels.`
    )
    return
  }
  next()
}