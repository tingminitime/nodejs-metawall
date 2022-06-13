const validator = require('validator')
const sizeOf = require('image-size')

exports.validateImageFile = (uploadImage) => {
  const imageRegex = /\.(jpe?g|png|gif)$/i
  return imageRegex.test(uploadImage)
}

exports.validateAvatarFile = (avatarBuffer) => {
  const dimensions = sizeOf(avatarBuffer)
  console.log('dimensions:', dimensions.width, dimensions.height)
  return dimensions.width === dimensions.height
    && dimensions.height >= 256
}