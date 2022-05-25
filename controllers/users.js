const User = require('../models/users')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

/**
 * [GET] Get user data
 */
exports.getUsersHandler = async (req, res, next) => {
  const users = await User.find()

  successHandler(
    res,
    200,
    users,
    `Get users successfully`,
    {
      total: users.length
    }
  )
}