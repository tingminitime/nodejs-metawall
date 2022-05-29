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

/**
 * Handle mongoose schema error validation
 * @param {object} errors 
 * @returns {string|undefined}
 */
const schemaErrorHandler = (errors) => {
  if (!errors) return
  let result = {}
  for (const [key, value] of Object.entries(errors)) {
    result[key] = value.message || 'validation error'
  }
  return result
}

const catchErrorDev = (err, res) => {
  res.status(err.status || 400).json({
    success: false,
    errorName: err.name,
    message: err.message || `Server Error or Invalid Request.`,
    error: err,
    stack: err.stack
  })
}

const catchErrorProd = (err, res) => {
  console.error(err)
  res.status(err.status || 400).json({
    success: false,
    message: err.message || `Server Error or Invalid Request.`
  })
}

module.exports = {
  errorHandler,
  successHandler,
  schemaErrorHandler,
  catchErrorDev,
  catchErrorProd
}