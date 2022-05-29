/**
 * @param  {function} args
 * @returns {object}
 */
exports.pipe = function pipe(...args) {
  return args.reduce((result, fn) => {
    result[fn.name] = fn()
    return result
  }, {})
}

/**
 * @param {object} validateResult 
 * @returns {boolean}
 */
exports.validateStatus = function validateStatus(validateResult = {}) {
  return Object.values(validateResult).some(result => result === false)
}

/**
 * @param {object} validateResult 
 * @param {function} validateMessage 
 */
exports.generateMessage = function generateMessage(
  validateResult,
  validateMessage
) {
  const result = {}
  for (const [key, value] of Object.entries(validateResult)) {
    if (!value) {
      result[key] = validateMessage()[key]
    }
  }
  return result
}