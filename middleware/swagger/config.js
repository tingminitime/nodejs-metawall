/**
 * PUBLIC POST OPERATION
 */
exports.getPosts = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '取得全部貼文資料'
   * #swagger.parameters['pageSize'] = {
      in: 'query',
      description: '一頁顯示幾筆',
      required: true,
      type: 'number',
      format: 'int64'
    }
   * #swagger.parameters['currentPage'] = {
      in: 'query',
      description: '當前頁碼',
      required: true,
      type: 'number',
      format: 'int64'
    }
   * #swagger.parameters['keyword'] = {
      in: 'query',
      description: '貼文搜尋關鍵字',
      type: 'string'
    }
   * #swagger.parameters['descending'] = {
      in: 'query',
      description: '貼文排序是否依發布時間降冪',
      type: 'boolean'
    }
   * #swagger.responses[400] = {
      description: '錯誤請求',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[200] = {
      description: '取得貼文回傳資訊',
      schema: { $ref: '#/definitions/getPostsSuccessfully' }
    }
  */

  next()
}

exports.getSinglePost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '取得單一貼文資料'
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '取得單筆貼文 id'
    }
   * #swagger.responses[400] = {
      description: '錯誤 id',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[200] = {
      description: '取得貼文回傳資訊',
      schema: { $ref: '#/definitions/getSinglePostSuccessfully' }
    }
   */

  next()
}

exports.likePost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '對貼文按喜歡'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '喜歡的貼文 id',
      required: true,
    }
   */

  next()
}

exports.cancelLikePost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '對貼文取消喜歡'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '取消喜歡的貼文 id',
      required: true,
    }
   */

  next()
}

exports.commentPost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '對貼文留言'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '留言的貼文 id',
      required: true,
    }
   */

  next()
}

exports.deleteCommentPost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除貼文的留言'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '刪除留言的 id',
      required: true,
    }
   */

  next()
}

exports.deleteAllPosts = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除全部貼文資料'
   */

  next()
}


/**
 * USER OPERATION
 */
exports.createPost = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '新增單筆貼文資料'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/createNewPostBody' }
    }
   * #swagger.responses[400] = {
      description: '新增貼文失敗',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[201] = {
      description: '新增貼文成功',
      schema: { $ref: '#/definitions/createNewPostSuccessfully' }
    }
   */

  next()
}

exports.updatePost = (req, res, next) => {
  /**
   * #swagger.tags = ['User Post']
   * #swagger.description = '更新貼文資訊'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/updateUserPostBody' }
    }
   * #swagger.responses[400] = {
      description: 'Register validation error.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[200] = {
      description: '貼文更新成功',
      schema: { $ref: '#/definitions/updateUserPostSuccessfully' }
    }
   */

  next()
}

exports.deleteSinglePost = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '刪除單筆貼文資料'
   */

  next()
}

exports.getLikedPosts = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取得使用者按讚文章資料'
   * #swagger.parameters['pageSize'] = {
      in: 'query',
      description: '一頁顯示幾筆',
      required: true,
      type: 'number',
      format: 'int64'
    }
   * #swagger.parameters['currentPage'] = {
      in: 'query',
      description: '當前頁碼',
      required: true,
      type: 'number',
      format: 'int64'
    }
   * #swagger.parameters['keyword'] = {
      in: 'query',
      description: '貼文搜尋關鍵字',
      type: 'string'
    }
   * #swagger.parameters['descending'] = {
      in: 'query',
      description: '貼文排序是否依發布時間降冪',
      type: 'boolean'
    }
   * #swagger.responses[400] = {
      description: '錯誤請求',
      schema: { $ref: '#/definitions/commonError' }
    }
   */

  next()
}

exports.followUser = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '追隨使用者'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '追隨使用者 id',
      required: true,
    }
   */

  next()
}

exports.cancelFollowUser = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取消追隨使用者'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '取消追隨使用者 id',
      required: true,
    }
   */

  next()
}

exports.getUserProfile = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取得使用者資料'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   */

  next()
}

exports.updateUserProfile = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '更新使用者資料'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/updateUserProfileBody' }
    }
   * #swagger.responses[400] = {
      description: 'Register validation error.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[200] = {
      description: '使用者資料更新成功',
      schema: { $ref: '#/definitions/updateUserProfileSuccessfully' }
    }
   */

  next()
}

exports.createUser = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '註冊帳號'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/createUserBody' }
    }
   * #swagger.responses[400] = {
      description: 'Register validation error.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[201] = {
      description: '帳號註冊成功',
      schema: { $ref: '#/definitions/createUserSuccessfully' }
    }
   */

  next()
}

exports.userLogin = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '使用者登入'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/userLoginBody' }
    }
   * #swagger.responses[400] = {
      description: 'Register validation error.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[201] = {
      description: '帳號註冊成功',
      schema: { $ref: '#/definitions/userLoginSuccessfully' }
    }
   */

  next()
}

exports.checkEmail = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '檢查 Email 是否重複'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/checkEmailBody' }
    }
   * #swagger.responses[400] = {
      description: 'The email already exists.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[201] = {
      description: '',
      schema: { $ref: '#/definitions/checkEmailSuccessfully' }
    }
   */

  next()
}

exports.updateUserPassword = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '更新密碼'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      type: 'object',
      required: true,
      schema: { $ref: '#/definitions/userUpdatePasswordBody' }
    }
   * #swagger.responses[400] = {
      description: 'Register validation error.',
      schema: { $ref: '#/definitions/commonError' }
    }
   * #swagger.responses[201] = {
      description: '密碼更新成功',
      schema: { $ref: '#/definitions/userUpdatePasswordSuccessfully' }
    }
   */

  next()
}

exports.uploadImage = (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.description = '上傳圖片'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.consumes = ['multipart/form-data']
   * #swagger.parameters['singleFile'] = {
      in: 'formData',
      description: '貼文圖片',
      type: 'file',
      required: true,
      schema: { $ref: '#/definitions/uploadImageBody' }
    }
   */

  next()
}

exports.uploadAvatar = (req, res, next) => {
  /**
   * #swagger.tags = ['Upload']
   * #swagger.description = '上傳大頭貼'
   * #swagger.security = [{
      "apiKeyAuth": []
    }]
   * #swagger.consumes = ['multipart/form-data']
   * #swagger.parameters['singleFile'] = {
      in: 'formData',
      description: '大頭貼圖片',
      type: 'file',
      required: true,
      schema: { $ref: '#/definitions/uploadImageBody' }
    }
   */

  next()
}
