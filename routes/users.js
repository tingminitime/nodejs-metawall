const express = require('express')
const router = express.Router()

// Controllers
const UserInfoController = require('../controllers/userInfo')
const UserPostController = require('../controllers/userPost')
const UserActivityController = require('../controllers/userActivity')

// Middleware - common
const mw = require('../middleware')
const setSwagger = require('../middleware/swagger/config')
const jwtAuth = require('../middleware/auth/jwtAuth')

// Middleware - validations
const updateUserProfileInspect = require('../middleware/userInfo/updateUserProfile')
const registerInspect = require('../middleware/userInfo/register')
const loginInspect = require('../middleware/userInfo/login')
const updatePasswordInspect = require('../middleware/userInfo/updatePassword')
const verifyPostOwnUser = require('../middleware/userPost/verifyPostOwner')
const createUserPostInspect = require('../middleware/userPost/createPost')
const followUserInspect = require('../middleware/userActivity/followUser')

// USER INFO ROUTER
/**
 * Get user profile
 */
router.get(
  '/profile',
  setSwagger.getUserProfile,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(UserInfoController.getUserProfileHandler)
)

/**
 * Update user profile
 */
router.patch(
  '/profile',
  setSwagger.updateUserProfile,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updateUserProfileInspect.validateFormat),
  mw.catchAsync(UserInfoController.updateUserProfileHandler)
)

/**
 * Check duplicate email
 */
router.post(
  '/check-email',
  setSwagger.checkEmail, // set swagger config
  mw.catchAsync(registerInspect.checkDuplicateEmail),
  mw.catchAsync(UserInfoController.checkEmailSuccessfully)
)

/**
 * Create a user
 */
router.post(
  '/register',
  setSwagger.createUser, // set swagger config
  mw.catchAsync(registerInspect.checkDuplicateEmail),
  mw.catchAsync(registerInspect.validateFormat),
  mw.catchAsync(UserInfoController.createUserHandler)
)

/**
 * User login
 */
router.post(
  '/login',
  setSwagger.userLogin, // set swagger config
  mw.catchAsync(loginInspect.validateFormat),
  mw.catchAsync(UserInfoController.userLoginHandler)
)

/**
 * Update user password
 */
router.patch(
  '/update-password',
  setSwagger.updateUserPassword, // set swagger config
  mw.catchAsync(jwtAuth),
  mw.catchAsync(updatePasswordInspect.validateFormat),
  mw.catchAsync(UserInfoController.updateUserPasswordHandler)
)


// USER POST ROUTER
/**
 * Create single post
 */
router.post(
  '/post/create',
  setSwagger.createPost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(createUserPostInspect.validateFormat),
  mw.catchAsync(UserPostController.createUserPostHandler)
)

/**
 * Update single post
 */
router.patch(
  '/post/:postId',
  setSwagger.updatePost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(verifyPostOwnUser),
  mw.catchAsync(UserPostController.updateUserPostHandler)
)

/**
 * Delete single post
 */
router.delete(
  '/post/:postId',
  setSwagger.deleteSinglePost,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(verifyPostOwnUser),
  mw.catchAsync(UserPostController.deleteUserPostHandler)
)

/**
 * Get user liked posts
 */
router.get(
  '/post/liked',
  setSwagger.getLikedPosts,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(UserPostController.getLikedPostsHandler)
)

/**
 * Follow other user
 */
router.post(
  '/post/follow/:followUserId',
  setSwagger.followUser,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(followUserInspect.checkDuplicateFollowing),
  mw.catchAsync(UserActivityController.followUserHandler)
)


/**
 * Cancel follow other user
 */
router.delete(
  '/post/follow/:followUserId',
  setSwagger.cancelFollowUser,
  mw.catchAsync(jwtAuth),
  mw.catchAsync(followUserInspect.checkFollowUserExist),
  mw.catchAsync(UserActivityController.CancelFollowUserHandler)
)


module.exports = router
