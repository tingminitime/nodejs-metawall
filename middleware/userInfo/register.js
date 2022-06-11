const validate = require('@utils/validate')
const userInspection = require('@utils/validate/user')
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

  const inspectResult = validate.pipe(
    userInspection.validateUsername(username),
    userInspection.validateEmail(email),
    userInspection.validatePassword(password),
    userInspection.validateConfirmPassword(confirmPassword, password),
    userInspection.validateSex(sex)
  )

  if (validate.validateStatus(inspectResult)) {
    errorHandler(
      res,
      400,
      `Register validations error.`,
      validate.generateMessage(inspectResult, userInspection.validateMessage),
    )
    return
  }

  next()
}

// Check duplicate email
exports.checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body

  const checkEmailFormat = userInspection.validateEmail(email)()
  if (!checkEmailFormat) {
    errorHandler(
      res,
      400,
      `'email' is not valid.`
    )
    return
  }

  const checkDuplicateEmail = await userInspection.checkDuplicateEmail(email)
  if (checkDuplicateEmail) {
    errorHandler(
      res,
      400,
      `The email already exists.`
    )
    return
  }

  next()
}