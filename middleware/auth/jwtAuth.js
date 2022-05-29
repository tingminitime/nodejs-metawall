const jwtHandler = require('@utils/jwt')
const { errorHandler } = require('@utils/response')

const auth = async (req, res, next) => {
  const authorization = req.headers.authorization || ''
  console.log('authorization:', authorization)
  const token = authorization.split('Bearer ')[1]
  console.log('token:', token)

  if (!token) {
    errorHandler(res, 401, `Unauthorized.`)
    return
  }

  const verifyToken = await jwtHandler.verifyJWT(token)
  req.userId = verifyToken.id

  next()
}

module.exports = auth