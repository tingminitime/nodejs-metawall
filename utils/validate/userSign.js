const User = require('@/models/users')
const validator = require('validator')

/**
 * Check email exist
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
exports.validateUsername = (inputUsername) => {
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
 * @param {string} inputSex 
 * @returns {boolean}
 */
exports.validateSex = (inputSex = '') => {
  return function sex() {
    return !validator.isEmpty(inputSex.trim())
      && validator.isIn(inputSex.trim(), ['male', 'female'])
  }
}

exports.validateMessage = () => {
  return {
    username: `'username' must be at least 3 characters.`,
    email: `'email' is not valid.`,
    password: `'password' must be at least 8 characters.`,
    confirmPassword: `'confirmPassword' must be equal to password.`,
    sex: `'sex' must be 'male' or 'female'`,
  }
}