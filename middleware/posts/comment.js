const validate = require('@utils/validate')
const commentValidator = require('@utils/validate/comment')
const { errorHandler } = require('@utils/response')

exports.validateFormat = async (req, res, next) => {
  const { comment } = req.body

  const validateResult = validate.pipe(
    commentValidator.validateComment(comment)
  )

  if (validate.validateStatus(validateResult)) {
    errorHandler(
      res,
      400,
      `Create comment validations error.`,
      validate.generateMessage(validateResult, commentValidator.validateMessage)
    )
  }

  next()
}
