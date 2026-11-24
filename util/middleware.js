const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { Session, User } = require('../models')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (!authorization || !authorization.toLowerCase().startsWith('bearer ')) {
    return res.status(401).json({ error: 'token missing' })
  }

  try {
    const token = authorization.substring(7)
    req.decodedToken = jwt.verify(token, SECRET)

    const session = await Session.findOne({
      where: { token }
    })

    if (!session) {
      return res.status(401).json({ error: 'session expired' })
    }

    const user = await User.findByPk(req.decodedToken.id)

    if (!user || user.disabled) {
      return res.status(401).json({ error: 'user disabled or not found' })
    }

    next()
  } catch (error) {
    return res.status(401).json({ error: 'token invalid' })
  }
}

module.exports = {
  tokenExtractor
}
