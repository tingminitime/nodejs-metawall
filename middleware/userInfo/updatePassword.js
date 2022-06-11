const validate = require('@utils/validate')
const userInspection = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate update password body format
exports.validateFormat = async (req, res, next) => {
  const { password, confirmPassword } = req.body

  const inspectResult = validate.pipe(
    userInspection.validatePassword(password),
    userInspection.validateConfirmPassword(confirmPassword, password),
  )

  if (validate.validateStatus(inspectResult)) {
    errorHandler(
      res,
      400,
      `Update password validations error.`,
      validate.generateMessage(inspectResult, userInspection.validateMessage),
    )
    return
  }

  next()
}