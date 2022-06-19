const validate = require('@utils/validate')
const userValidator = require('@utils/validate/user')
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

  const validateResult = validate.pipe(
    userValidator.validateUsername(username),
    userValidator.validateEmail(email),
    userValidator.validatePassword(password),
    userValidator.validateConfirmPassword(confirmPassword, password),
    userValidator.validateSex(sex)
  )

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Register validations error.`,
      validate.generateMessage(validateResult, userValidator.validateMessage),
    )
    return
  }

  next()
}

// Check duplicate email
exports.checkDuplicateEmail = async (req, res, next) => {
  const { email } = req.body

  const checkEmailFormat = userValidator.validateEmail(email)()
  if (!checkEmailFormat) {
    errorHandler(
      res,
      400,
      `'email' is not valid.`
    )
    return
  }

  const checkDuplicateEmail = await userValidator.checkDuplicateEmail(email)
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