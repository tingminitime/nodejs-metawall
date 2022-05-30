const validate = require('@utils/validate')
const userInspection = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate update user profile body format
exports.validateFormat = async (req, res, next) => {
  const { username, avatar, sex } = req.body

  const inspectResult = {}

  if (username) {
    Object.assign(
      inspectResult,
      validate.pipe(userInspection.validateUsername(username))
    )
  }

  if (avatar) {
    Object.assign(
      inspectResult,
      validate.pipe(userInspection.validateAvatar(avatar))
    )
  }

  if (sex) {
    Object.assign(
      inspectResult,
      validate.pipe(userInspection.validateSex(sex))
    )
  }

  if (Object.keys(inspectResult).length === 0) {
    errorHandler(
      res,
      400,
      `Non-content error.`
    )
    return
  }

  if (validate.validateStatus(inspectResult)) {
    errorHandler(
      res,
      400,
      `Update user profile validations error.`,
      validate.generateMessage(inspectResult, userInspection.validateMessage),
    )
  }

  next()
}