const validate = require('@utils/validate')
const userSign = require('@utils/validate/userSign')
const { errorHandler } = require('@utils/response')

// Validate login body format
exports.validateFormat = async (req, res, next) => {
  const { password, confirmPassword } = req.body

  const result = validate.pipe(
    userSign.validatePassword(password),
    userSign.validateConfirmPassword(confirmPassword, password),
  )

  if (validate.validateStatus(result)) {
    errorHandler(
      res,
      400,
      `Update password validations error.`,
      validate.generateMessage(result, userSign.validateMessage),
    )
  }

  next()
}