const User = require('../models/users')
const encryptions = require('@utils/encryptions')
const jwtHandler = require('@utils/jwt')
const dayjs = require('dayjs')
const {
  successHandler, errorHandler
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
    errorHandler(res, 401, `Non-existent email.`)
    return
  }

  const auth = await encryptions.compare(password, user.password)
  if (!auth) {
    errorHandler(res, 401, `Invalid password.`)
    return
  }

  const token = jwtHandler.generateJWT({ id: user._id, name: user.userName })

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
 * [POST] Update user password
 */
exports.updateUserPassword = async (req, res, next) => {
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

  if (user) {
    successHandler(
      res,
      200,
      user,
      `${user.username} update password successfully.`
    )
  } else {
    errorHandler(res, 400, `Non-existent user.`)
  }
}