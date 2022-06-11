const Imgur = require('../utils/imgur')
const { successHandler, errorHandler } = require('../utils/response')

exports.uploadImageHandler = async (req, res, next) => {
  const imageFile = req.file
  const response = await Imgur.uploadImageFile(imageFile.buffer)

  if (!response.success) {
    errorHandler(
      res,
      403,
      `Upload image failed by status ${response.status}.`,
    )
    return
  }
  successHandler(
    res,
    201,
    response,
    `Upload image successfully.`
  )
}

exports.uploadAvatarHandler = async (req, res, next) => {
  const avatarFile = req.file
  const response = await Imgur.uploadAvatarFile(avatarFile.buffer)

  if (!response.success) {
    errorHandler(
      res,
      403,
      `Upload image failed by status ${response.status}.`,
    )
    return
  }
  successHandler(
    res,
    201,
    response,
    `Upload avatar successfully.`
  )
}