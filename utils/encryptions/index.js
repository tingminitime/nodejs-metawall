const bcrypt = require('bcrypt')

exports.encrypt = async (password = '') => {
  return await bcrypt.hash(password, 12)
}

exports.compare = async (
  userInputPassword,
  comparePassword
) => {
  return await bcrypt.compare(userInputPassword, comparePassword)
}
