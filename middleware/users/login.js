const validate = require('@utils/validate')
const userSign = require('@utils/validate/userSign')
const { errorHandler } = require('@utils/response')

// Validate login body format
exports.validateFormat = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  const result = validate.pipe(
    userSign.validateEmail(email),
    userSign.validatePassword(password),
  )

  if (validate.validateStatus(result)) {
    errorHandler(
      res,
      400,
      `Login validations error.`,
      validate.generateMessage(result, userSign.validateMessage),
    )
  }

  next()
}