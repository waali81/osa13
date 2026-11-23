const { tokenExtractor } = require('../util/middleware')
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

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingList = await ReadingList.findByPk(req.params.id)

    if (!readingList) {
      return res.status(404).json({ error: 'reading list entry not found' })
    }

    if (readingList.userId !== req.decodedToken.id) {
      return res.status(403).json({ error: 'only the user who added the blog can mark it as read' })
    }

    readingList.read = req.body.read
    await readingList.save()

    res.json(readingList)
  } catch (error) {
    next(error)
  }
})

module.exports = router