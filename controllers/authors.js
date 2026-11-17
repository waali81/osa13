const { sequelize } = require('../util/db')
const { Blog } = require('../models')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes']
    ],
    order: [[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']],
    group: ['author']
  })

  res.json(authors)
})

module.exports = router