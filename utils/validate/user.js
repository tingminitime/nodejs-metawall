const User = require('@/models/users')
const validator = require('validator')

/**
 * @param {string} inputEmail 
 * @returns {object|null}
 */
exports.checkDuplicateEmail = async (inputEmail) => {
  return await User.findOne({ email: inputEmail }).exec()
}

/**
 * @param {string} inputUsername 
 * @returns {boolean}
 */
exports.validateUsername = (inputUsername = '') => {
  return function username() {
    return validator.isLength(inputUsername.trim(), { min: 3 })
  }
}

/**
 * @param {string} inputEmail 
 * @returns {boolean}
 */
exports.validateEmail = (inputEmail = '') => {
  return function email() {
    return validator.isEmail(inputEmail)
  }
}

/**
 * @param {string} inputPassword 
 * @returns {boolean}
 */
exports.validatePassword = (inputPassword = '') => {
  return function password() {
    return validator.isLength(inputPassword.trim(), { min: 8 })
  }
}

/**
 * @param {string} inputConfirmPassword 
 * @returns {boolean}
 */
exports.validateConfirmPassword = (
  inputConfirmPassword = '',
  inputPassword = ''
) => {
  return function confirmPassword() {
    return validator.equals(inputConfirmPassword.trim(), inputPassword.trim())
  }
}

/**
 * @param {string} inputAvatar
 * @returns {boolean}
 */
exports.validateAvatar = (inputAvatar = '') => {
  const avatarRegex = /\.(jpe?g|png|gif|bmp)$/i

  return function avatar() {
    return validator.isURL(inputAvatar) && avatarRegex.test(inputAvatar)
  }
}

/**
 * @param {string} inputSex
 * @returns {boolean}
 */
exports.validateSex = (inputSex = '') => {
  return function sex() {
    return !validator.isEmpty(inputSex.trim())
      && validator.isIn(inputSex.trim(), ['male', 'female'])
  }
}

/**
 * @param {string} inputContent
 * @returns {boolean}
 */
exports.validatePostContent = (inputContent = '') => {
  return function content() {
    return !validator.isEmpty(inputContent.trim())
  }
}

/**
 * @param {string} inputImage
 * @returns {boolean}
 */
exports.validatePostImage = (inputImage = '') => {
  const imageRegex = /\.(jpe?g|png|gif)$/i

  return function image() {
    return validator.isURL(inputImage) && imageRegex.test(inputImage)
  }
}

/**
 * @param {string} inputType
 * @returns {boolean}
 */
exports.validatePostType = (inputType = '') => {
  return function type() {
    return !validator.isEmpty(inputType.trim())
      && validator.isIn(inputType.trim(), ['person', 'group'])
  }
}

exports.validateMessage = () => {
  return {
    username: `'username' must be at least 3 characters.`,
    email: `'email' is not valid.`,
    password: `'password' must be at least 8 characters.`,
    confirmPassword: `'confirmPassword' must be equal to password.`,
    avatar: `'avatar' must be a valid url and extension must be 'jpg', 'jpeg', 'png', 'gif', 'bmp'`,
    sex: `'sex' must be 'male' or 'female'`,
    content: `'content' cannot be empty.`,
    image: `'image' must be a valid url and extension must be 'jpg', 'jpeg', 'png', 'gif'`,
  }
}