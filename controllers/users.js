const User = require('../models/users')
const { errorHandler, successHandler, schemaErrorHandler } = require('../utils/responseHandler')

/**
 * [GET] Get user data
 */
exports.getUsersHandler = async (req, res, next) => {
  /**
   * #swagger.tags = ['Users']
   * #swagger.description = '取得所有使用者資料'
   * #swagger.ignore = false
   */
  try {
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
  } catch (error) {
    console.error(error)
    errorHandler(
      res,
      500,
      `Server Error or Invalid Request`
    )
  }
}