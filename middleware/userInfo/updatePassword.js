const validate = require('@utils/validate')
const userValidator = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate update password body format
exports.validateFormat = async (req, res, next) => {
  const { password, confirmPassword } = req.body

  const validateResult = validate.pipe(
    userValidator.validatePassword(password),
    userValidator.validateConfirmPassword(confirmPassword, password),
  )

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Update password validations error.`,
      validate.generateMessage(validateResult, userValidator.validateMessage),
    )
    return
  }

  next()
}