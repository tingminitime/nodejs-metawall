const validator = require('validator')

/**
 * @param {string} inputComment
 * @returns {boolean}
 */
exports.validateComment = (inputComment = '') => {
  return function content() {
    return !validator.isEmpty(inputComment.trim())
  }
}

exports.validateMessage = () => {
  return {
    content: `'comment' cannot be empty.`
  }
}