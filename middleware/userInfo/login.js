const validate = require('@utils/validate')
const userInspection = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

// Validate login body format
exports.validateFormat = async (req, res, next) => {
  const {
    email,
    password
  } = req.body

  const inspectResult = validate.pipe(
    userInspection.validateEmail(email),
    userInspection.validatePassword(password),
  )

  if (validate.validateStatus(inspectResult)) {
    errorHandler(
      res,
      400,
      `Login validations error.`,
      validate.generateMessage(inspectResult, userInspection.validateMessage),
    )
    return
  }

  next()
}