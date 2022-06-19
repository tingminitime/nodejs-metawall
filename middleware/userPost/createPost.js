const validate = require('@utils/validate')
const userValidator = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

exports.validateFormat = async (req, res, next) => {
  const { content, image, type, tags } = req.body

  const validateResult = validate.pipe(
    userValidator.validatePostContent(content),
    userValidator.validatePostImage(image),
    userValidator.validatePostType(type),
    userValidator.validatePostTags(tags)
  )

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Create post validations error.`,
      validate.generateMessage(validateResult, userValidator.validateMessage)
    )
  }

  next()
}