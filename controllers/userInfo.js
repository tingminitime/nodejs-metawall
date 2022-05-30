const User = require('../models/users')
const encryptions = require('@utils/encryptions')
const jwtHandler = require('@utils/jwt')
const dayjs = require('dayjs')
const {
  successHandler, errorHandler
} = require('../utils/response')

/**
 * [GET] Get user profile (Auth)
 */
exports.getUserProfileHandler = async (req, res, next) => {
  const userId = req.userId

  const userProfile = await User.findById(userId)

  if (!userProfile) {
    errorHandler(res, 400, `Non-existent user.`)
    return
  }

  successHandler(
    res,
    200,
    userProfile,
    `Get user profile successfully.`
  )
}

/**
 * [PATCH] Update user profile (Auth)
 */
exports.updateUserProfileHandler = async (req, res, next) => {
  const { username, avatar, sex } = req.body
  const userId = req.userId

  const newProfile = await User.findByIdAndUpdate(
    userId,
    { username, avatar, sex },
    { new: true, runValidators: true }
  )

  if (!newProfile) {
    errorHandler(res, 400, `Non-existent user.`)
    return
  }

  successHandler(
    res,
    200,
    newProfile,
    `Update user profile successfully.`
  )
}

/**
 * [POST] Check duplicate email
 */
exports.checkEmailSuccessfully = async (req, res, next) => {
  const { email } = req.body
  successHandler(
    res,
    200,
    { email },
    `The email is valid.`
  )
}

/**
 * [POST] Create a user
 */
exports.createUserHandler = async (req, res, next) => {
  const { username, email, password, sex } = req.body

  const encryptPassword = await encryptions.encrypt(password)
  const newUser = await User.create({
    username,
    email,
    password: encryptPassword,
    sex
  })

  const token = jwtHandler.generateJWT({
    id: newUser._id,
    name: newUser.userName
  })

  successHandler(
    res,
    201,
    {
      username: newUser.username,
      email: newUser.email,
      sex: newUser.sex,
      token: token
    },
    `Create user successfully.`
  )
}

/**
 * [POST] User login
 */
exports.userLoginHandler = async (req, res, next) => {
  const { email, password } = req.body

  const user = await User
    .findOne({ email })
    .select('+email +password')

  if (!user) {
    errorHandler(res, 400, `Non-existent email.`)
    return
  }

  const auth = await encryptions.compare(password, user.password)
  if (!auth) {
    errorHandler(res, 401, `Invalid password.`)
    return
  }

  const token = jwtHandler.generateJWT({
    id: user._id,
    name: user.userName
  })

  successHandler(
    res,
    200,
    {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      sex: user.sex,
      token
    },
    `User login successfully.`
  )
}

/**
 * [POST] Update user password (Auth)
 */
exports.updateUserPasswordHandler = async (req, res, next) => {
  const { password } = req.body

  const encryptPassword = await encryptions.encrypt(password)
  const user = await User.findByIdAndUpdate(
    { _id: req.userId },
    {
      password: encryptPassword,
      lastUpdatedPasswordAtTW: dayjs(Date.now()).tz('Asia/Taipei').format()
    },
    { new: true, runValidators: true }
  )

  if (!user) {
    errorHandler(res, 400, `Non-existent user.`)
    return
  }

  successHandler(
    res,
    200,
    user,
    `Update password successfully.`
  )
}