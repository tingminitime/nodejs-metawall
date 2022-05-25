const {
  errorHandler,
  catchErrorDev,
  catchErrorProd,
  schemaErrorHandler
} = require("../utils/response")

/**
 * Catch API error
 * @param {function} fn 
 * @returns {function}
 */
exports.catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(
    fn(req, res, next)
  ).catch(error => {
    next(error)
  })
}

// Catch 404 not found
exports.catchNotFount = (req, res, next) => {
  errorHandler(res, 404, `Invalid request path.`)
}

// Catch exception error
exports.catchException = (err, req, res, next) => {
  console.error(err)
  // Schema error
  if (err.name === 'ValidationError') {
    const errorMessage = schemaErrorHandler(err.errors) || { error: err?.message }
    errorHandler(
      res,
      400,
      `Validation error.`,
      errorMessage || `Validation error.`
    )
    return
  }

  // development env catch error
  if (process.env.NODE_ENV === 'development') {
    catchErrorDev(err, res)
    return
  }

  // production or other env catch error
  catchErrorProd(err, res)
}
