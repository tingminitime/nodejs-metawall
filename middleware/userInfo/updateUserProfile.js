const validate = require('@utils/validate')
const userValidator = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate update user profile body format
exports.validateFormat = async (req, res, next) => {
  const { username, avatar, sex } = req.body

  const validateResult = {}

  if (username) {
    Object.assign(
      validateResult,
      validate.pipe(userValidator.validateUsername(username))
    )
  }

  if (avatar) {
    Object.assign(
      validateResult,
      validate.pipe(userValidator.validateAvatar(avatar))
    )
  }

  if (sex) {
    Object.assign(
      validateResult,
      validate.pipe(userValidator.validateSex(sex))
    )
  }

  if (Object.keys(validateResult).length === 0) {
    errorHandler(
      res,
      400,
      `Non-content error.`
    )
    return
  }

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Update user profile validations error.`,
      validate.generateMessage(validateResult, userValidator.validateMessage),
    )
    return
  }

  next()
}