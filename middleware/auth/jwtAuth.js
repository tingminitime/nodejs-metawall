const jwtHandler = require('@utils/jwt')
const { errorHandler } = require('@utils/response')

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization || ''
  const token = authorization.split('Bearer ')[1]

  if (!token) {
    errorHandler(res, 401, `Unauthorized.`)
    return
  }

  // "catchAsync" will handle error if "verifyJWT" throw error
  const verifyToken = await jwtHandler.verifyJWT(token)
  req.userId = verifyToken.id

  next()
}

module.exports = auth