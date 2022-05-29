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

exports.createPost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
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

exports.deleteAllPosts = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除全部貼文資料'
   */

  next()
}

exports.deleteSinglePost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除單筆貼文資料'
   */

  next()
}

exports.updatePost = (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '更新單筆貼文資料'
   * #swagger.parameters['body'] = {
      in: 'body',
      description: '資料格式',
      required: true,
      schema: { $ref: '#/definitions/updatePostBody' }
    }
   */

  next()
}

exports.getUsers = (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = '取得所有使用者資料'
   * #swagger.ignore = false
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