const validate = require('@utils/validate')
const userValidator = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate login body format
exports.validateFormat = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  const validateResult = validate.pipe(
    userValidator.validateEmail(email),
    userValidator.validatePassword(password),
  )

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Login validations error.`,
      validate.generateMessage(validateResult, userValidator.validateMessage),
    )
    return
  }

  next()
}