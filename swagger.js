const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Metawall API',
    description: '示範範例生成文件',
  },
  host: 'localhost:3005',
  schemes: ['http', 'https'],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'token',
    }
  },
  definitions: {
    commonError: {
      success: false,
      message: '錯誤請求描述'
    },
    getPostsSuccessfully: {
      data: [
        {
          _id: '貼文 id',
          user: {
            _id: '使用者 id',
            avatar: '使用者大頭貼',
            userName: '使用者名稱'
          },
          tags: ['貼文標籤'],
          type: '貼文類別',
          image: '貼文圖片網址',
          content: '貼文內容',
          likes: 0,
          comments: 0,
          createdAt: '貼文發布時間(UTC)',
          createdAtTW: '貼文發布時間(UTC+08:00)'
        }
      ],
      success: true,
      message: 'API 訊息',
      total: 0,
      pageSize: 10,
      currentPage: 1
    },
    getSinglePostSuccessfully: {
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
    },
    createNewPostSuccessfully: {
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
    },
    createNewPostBody: {
      $content: '貼文內容',
      $userId: '使用者 id',
      $tags: ['貼文標籤'],
      $type: 'person',
      image: ''
    },
    updatePostBody: {
      $content: '貼文內容'
    }
  }
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./app.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
