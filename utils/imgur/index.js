const { ImgurClient } = require('imgur')

const client = new ImgurClient({
  clientId: process.env.IMGUR_CLI_ID,
  clientSecret: process.env.IMGUR_CLI_SECRET,
  refreshToken: process.env.IMGUR_REFRESH_TOKEN
})

exports.uploadImageFile = imageBuffer => client.upload({
  image: Buffer.from(imageBuffer).toString('base64'),
  type: 'base64',
  album: process.env.IMGUR_ALBUM_ID_POST,
  description: 'metawall post image.'
})

exports.uploadAvatarFile = imageBuffer => client.upload({
  image: Buffer.from(imageBuffer).toString('base64'),
  type: 'base64',
  album: process.env.IMGUR_ALBUM_ID_AVATAR,
  description: 'metawall avatar.'
})

