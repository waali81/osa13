const router = require('express').Router()

const { Blog, User, ReadingList } = require('../models')

router.post('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId)

    if (!user) {
      return res.status(404).json({ error: 'user not found' })
    }

    const blog = await Blog.findByPk(req.body.blogId)

    if (!blog) {
      return res.status(404).json({ error: 'blog not found' })
    }

    const readingList = await ReadingList.create({
      userId: req.body.userId,
      blogId: req.body.blogId
    })

    res.json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = router