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
   * #swagger.tags = ['Users']
   * #swagger.description = '取得所有使用者資料'
   * #swagger.ignore = false
   */

  next()
}