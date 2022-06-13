const User = require('@models/users')
const { errorHandler } = require('@utils/response')

exports.checkDuplicateFollowing = async (req, res, next) => {
  const { followUserId } = req.params
  const userId = req.userId

  const user = await User.findById(userId)
  console.log(user)
  if (
    user?.following
      .some(followTarget => followTarget.user.toString() === followUserId)
  ) {
    errorHandler(
      res,
      400,
      `Cannot follow same user.`
    )
  } else {
    next()
  }
}

exports.checkFollowUserExist = async (req, res, next) => {
  const { followUserId } = req.params
  const userId = req.userId

  const user = await User.findById(userId)
  if (
    !user?.following
      .some(followTarget => followTarget.user.toString() === followUserId)
  ) {
    errorHandler(
      res,
      400,
      `Unable to operate because you have not followed this user.`
    )
  } else {
    next()
  }
}