const errorHandler = (
  res,
  statusCode = 400,
  message = 'error',
  validationResult
) => {
  res.status(statusCode).json({
    success: false,
    message,
    validationResult
  })
}

const successHandler = (
  res,
  statusCode = 200,
  data = [],
  message = 'success',
  { ...args } = {}
) => {
  res.status(statusCode).json({
    data,
    success: true,
    message,
    ...args
  })
}

const schemaErrorHandler = (errors) => {
  if (!errors) return
  let result = {}
  for (const [key, value] of Object.entries(errors)) {
    result[key] = value.message || 'validation error'
  }
  return result
}

module.exports = {
  errorHandler,
  successHandler,
  schemaErrorHandler
}