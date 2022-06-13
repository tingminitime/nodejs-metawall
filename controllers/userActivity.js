const User = require('../models/users')
const {
  errorHandler,
  successHandler
} = require('../utils/response')

/**
 * [POST] Follow other user
 */
exports.followUserHandler = async (req, res, next) => {
  const { followUserId } = req.params
  const userId = req.userId

  if (followUserId === userId) {
    errorHandler(
      res,
      400,
      `Cannot follow yourself.`
    )
    return
  }

  const followUser = await User.findById(followUserId).select('username avatar')
  if (!followUser) {
    errorHandler(
      res,
      400,
      `Cannot follow this user because this user doesn't exist.`
    )
    return
  }

  // Add following
  await User.updateOne(
    {
      _id: userId,
      'following.user': { $ne: followUserId }
    },
    {
      $push: { following: { user: followUserId } }
    }
  )

  // Add follower
  await User.updateOne(
    {
      _id: followUserId,
      'followers.user': { $ne: userId }
    },
    {
      $push: { followers: { user: userId } }
    }
  )

  successHandler(
    res,
    201,
    followUser,
    `Follow user successfully.`
  )
}

/**
 * [DELETE] Cancel follow other user
 */
exports.CancelFollowUserHandler = async (req, res, next) => {
  const { followUserId } = req.params
  const userId = req.userId

  const followUser = await User.findById(followUserId).select('username avatar')

  // Remove following
  await User.updateOne(
    {
      _id: userId,
      'following.user': { $in: followUserId }
    },
    {
      $pull: { following: { user: followUserId } }
    }
  )

  // Remove follower
  await User.updateOne(
    {
      _id: followUserId,
      'followers.user': { $in: userId }
    },
    {
      $pull: { followers: { user: userId } }
    }
  )

  successHandler(
    res,
    201,
    followUser,
    `Cancel follow user successfully.`
  )
}