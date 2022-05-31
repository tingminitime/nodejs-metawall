const validate = require('@utils/validate')
const userInspection = require('@utils/validate/user')
const { errorHandler } = require('@utils/response')

exports.validateFormat = async (req, res, next) => {
  const { content, image, type, tags } = req.body

  const inspectionResult = validate.pipe(
    userInspection.validatePostContent(content),
    userInspection.validatePostImage(image),
    userInspection.validatePostType(type),
    userInspection.validatePostTags(tags)
  )

  if (validate.validateStatus(inspectionResult)) {
    errorHandler(
      res,
      400,
      `Create post validations error.`,
      validate.generateMessage(inspectionResult, userInspection.validateMessage)
    )
  }

  next()
}