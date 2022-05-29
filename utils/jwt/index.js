const jwt = require('jsonwebtoken')


exports.generateJWT = function generateJWT({ id = '', name = '' }) {
  const token = jwt.sign(
    { id, name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_DAY }
  )

  return token
}

exports.verifyJWT = function verifyJWT(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      console.log('verifyJWT:', err)
      console.log('payload:', payload)

      switch (err?.name) {
        // Invalid token
        case 'JsonWebTokenError':
          err.message = 'Invalid token.'
          reject(err)
          break

        // Thrown error if the token is expired.
        case 'TokenExpiredError':
          err.message = 'Expired token.'
          reject(err)
          break

        // Thrown if current time is before the nbf claim.
        case 'NotBeforeError':
          err.message = 'Token not active.'
          reject(err)
          break

        default:
          resolve(payload)
          break
      }
    })
  })
}
