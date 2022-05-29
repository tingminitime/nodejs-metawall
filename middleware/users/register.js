const validate = require('@utils/validate')
const userSign = require('@utils/validate/userSign')
const { errorHandler } = require('@utils/response')

// Validate register body format
exports.validateFormat = async (req, res, next) => {
  const {
    username,
    email,
    password,
    confirmPassword,
    sex
  } = req.body

  const result = validate.pipe(
    userSign.validateUsername(username),
    userSign.validateEmail(email),
    userSign.validatePassword(password),
    userSign.validateConfirmPassword(confirmPassword, password),
    userSign.validateSex(sex)
  )

  if (validate.validateStatus(result)) {
    errorHandler(
      res,
      400,
      `Register validations error.`,
      validate.generateMessage(result, userSign.validateMessage),
    )
  }

  next()
}

// Check duplicate email
exports.checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body

  const checkEmailFormat = userSign.validateEmail(email)()
  if (!checkEmailFormat) {
    errorHandler(
      res,
      400,
      `Email format validation error.`
    )
    return
  }

  const checkDuplicateEmail = await userSign.checkDuplicateEmail(email)
  if (checkDuplicateEmail) {
    errorHandler(
      res,
      400,
      `The email already exists.`
    )
  } else {
    next()
  }
}