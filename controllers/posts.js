const Post = require('../models/posts')
const User = require('../models/users')
const { errorHandler, successHandler, schemaErrorHandler } = require('../utils/responseHandler')

/**
 * [GET] Get post data
 * all posts, keyword search, pagination search
 */
exports.getPostsHandler = async (req, res, next) => {
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

  const { query } = req

  // If params hasn't Id, have to give pagination query. (pageSize, currentPage)
  if (query.pageSize && query.currentPage) {
    const sort = query.descending ? -1 : 1
    // Keywords search
    if (query.keyword) {
      try {
        const posts = await Post
          .find({ content: { $regex: query.keyword } })
          .skip(query.pageSize * (query.currentPage - 1))
          .limit(query.pageSize)
          .sort({ createdAt: sort })
          .populate({
            path: 'user',
            select: 'userName avatar'
          })

        successHandler(
          res,
          200,
          posts,
          `Get posts successfully`,
          {
            total: posts.length,
            pageSize: Number(query.pageSize),
            currentPage: Number(query.currentPage)
          }
        )
      } catch (error) {
        console.error(error)
        errorHandler(
          res,
          400,
          `Invalid request path or something error happened.`
        )
      }
    }
    // No keywords search
    else {
      try {
        const count = await Post.count({})
        const posts = await Post
          .find()
          .skip(query.pageSize * (query.currentPage - 1))
          .limit(query.pageSize)
          .sort({ createdAt: sort })
          .populate({
            path: 'user',
            select: 'userName avatar'
          })

        successHandler(
          res,
          200,
          posts,
          `Get posts successfully`,
          {
            total: count,
            pageSize: Number(query.pageSize),
            currentPage: Number(query.currentPage)
          }
        )
      } catch (error) {
        console.error(error)
        errorHandler(
          res,
          400,
          `Invalid request path or something error happened.`
        )
      }
    }
  }
  else {
    errorHandler(
      res,
      400,
      `Ensure that the query has 'pageSize' and 'currentPage'.`
    )
  }
}

/**
 * [GET] Get single post data
 */
exports.getSinglePostHandler = async (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '取得單一貼文資料'
   * #swagger.parameters['postId'] = {
      in: 'query',
      description: '取得單筆貼文 id'
    }
   * #swagger.responses[400] = {
      description: '錯誤 id',
      schema: {
        success: false,
        message: 'Invalid Id.'
      }
    }
   * #swagger.responses[200] = {
      description: '取得貼文回傳資訊',
      schema: {
        data: {
          _id: '貼文 id',
          user: {
            _id: '使用者 id',
            avatar: '使用者大頭貼',
            userName: '使用者名稱'
          },
          tags: ['貼文標籤'],
          type: '貼文類別',
          image: '貼文圖片',
          content: '貼文內容',
          likes: 0,
          comments: 0,
          createdAt: '貼文發布時間(UTC)',
          createdAtTW: '貼文發布時間(UTC+8)'
        },
        success: true,
        message: 'API 訊息'
      }
    }
   */

  const { params } = req

  // If params has Id, return single post data
  if (params.postId) {
    try {
      const post = await Post
        .findById(params.postId)
        .populate({
          path: 'user',
          select: 'userName avatar'
        })
      // Maybe mongoDB will return success message but null result
      if (post) {
        successHandler(res, 200, post)
      } else {
        errorHandler(
          res,
          404,
          `Cannot find the post by this Id.`
        )
      }
    } catch (error) {
      console.error(error)
      errorHandler(
        res,
        400,
        `Invalid Id.`
      )
    }
  } else {
    errorHandler(
      res,
      400,
      `Ensure that the query has 'pageSize' and 'currentPage'.`
    )
  }
}

/**
 * [POST] Add new post data
 */
exports.createNewPostHandler = async (req, res, next) => {
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
      schema: {
        $content: '貼文內容',
        $userId: '使用者 id',
        $tags: ['貼文標籤'],
        $type: 'person',
        image: ''
      }
    }
   * #swagger.responses[400] = {
      description: '新增貼文失敗',
      schema: {
        success: false,
        message: '錯誤訊息描述'
      }
    }
   * #swagger.responses[201] = {
      description: '新增貼文成功',
      schema: {
        data: {
          user: {
            _id: '使用者 id',
            avatar: '使用者大頭貼',
            userName: '使用者名稱'
          },
          tags: [
            '貼文標籤'
          ],
          type: 'person',
          image: '貼文圖片網址',
          content: '貼文內容',
          likes: 0,
          comments: 0,
          _id: '貼文 id',
          createdAt: '貼文發布時間(UTC)',
          createdAtTW: '貼文發布時間(UTC+08:00)'
        },
        success: true,
        message: 'Create post successfully.'
      }
    }
   */

  const reqData = req.body
  if (!reqData || Object.keys(reqData).length === 0) {
    errorHandler(res, 400, `Empty request data.`)
    return
  }

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  if (!reqData.userId) {
    errorHandler(res, 400, `Cannot send data without 'userId'.`)
    return
  }

  try {
    const user = await User.exists({ _id: reqData.userId })
    if (!user) throw new Error(`The userId does not exist.`)

    let newPost = await Post.create({
      user: reqData.userId,
      tags: reqData.tags,
      type: reqData.type,
      image: reqData.image,
      content: reqData.content,
    })

    newPost = await newPost.populate({
      path: 'user',
      select: 'userName avatar'
    })

    successHandler(
      res,
      201,
      newPost,
      `Create post successfully.`
    )
  } catch (error) {
    console.error('TypeError', error)
    const errorMessage = schemaErrorHandler(error.errors) || { error: error?.message }
    errorHandler(
      res,
      400,
      `Validation error.`,
      errorMessage || `Invalid data format`
    )
  }
}

/**
 * [DELETE] Delete all post data
 */
exports.deleteAllPostsHandler = async (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除全部貼文資料'
   */

  try {
    const data = await Post.deleteMany({})
    successHandler(
      res,
      200,
      [],
      `Delete all posts successfully.`,
      {
        ...data
      }
    )
  } catch (error) {
    console.error(error)
    errorHandler(res, 500, `Internal server error.`)
  }
}

/**
 * [DELETE] Delete single post data
 */
exports.deleteSinglePostHandler = async (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '刪除單筆貼文資料'
   */

  const { params } = req
  if (!params.postId) {
    errorHandler(res, 400, `Delete unsuccessfully, no Id exist.`)
    return
  }

  try {
    const deletePost = await Post.findByIdAndDelete({ _id: params.postId })
      .populate({
        path: 'user',
        select: 'userName avatar'
      })
    if (!deletePost) throw new Error(`Cannot find the post by this Id.`)
    successHandler(
      res,
      200,
      deletePost,
      `Delete one post: userId: ${deletePost.user._id} postId:${deletePost._id}`,
      {
        userId: deletePost.user._id,
        postId: deletePost._id,
      }
    )
  } catch (error) {
    console.error(error)
    errorHandler(res, 404, error.message || error)
  }
}

/**
 * [PATCH] Update single post
 */
exports.updatePostHandler = async (req, res, next) => {
  /**
   * #swagger.tags = ['Posts - 貼文']
   * #swagger.description = '更新單筆貼文資料'
   */
  const { params } = req
  const reqData = req.body

  if (!reqData.content) {
    errorHandler(res, 400, `Cannot send data without 'content'.`)
    return
  }

  try {
    const updatePost = await Post.findByIdAndUpdate(
      { _id: params.postId },
      reqData,
      { new: true, runValidators: true }
    ).populate({
      path: 'user',
      select: 'userName avatar'
    })

    if (updatePost) {
      successHandler(
        res,
        200,
        updatePost,
        `Update the post successfully.`
      )
    } else {
      errorHandler(res, 400, `Cannot find the post by this Id or connect error.`)
    }
  } catch (error) {
    console.error('TypeError', error)
    const errorMessage = schemaErrorHandler(error.errors)
    errorHandler(
      res,
      400,
      `Validation error.`,
      errorMessage || `Validation error.`
    )
  }
}
