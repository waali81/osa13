const express = require('express')
const app = express()
const { PORT } = require('./util/config')
const { connectToDatabase, runMigrations } = require('./util/db')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const authorsRouter = require('./controllers/authors')
const readinglistsRouter = require('./controllers/readinglists')
const { Blog, User, Session, ReadingList } = require('./models')
const { tokenExtractor } = require('./util/middleware')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/authors', authorsRouter)
app.use('/api/readinglists', readinglistsRouter)

app.post('/api/reset', async (req, res, next) => {
  try {
    await ReadingList.destroy({ where: {} })
    await Session.destroy({ where: {} })
    await Blog.destroy({ where: {} })
    await User.destroy({ where: {} })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.get('/', (req, res) => {
  res.sendStatus(200)
})

app.delete('/api/logout', tokenExtractor, async (req, res, next) => {
  try {
    const token = req.get('authorization').substring(7)

    await Session.destroy({
      where: { token }
    })

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((error, req, res, next) => {
  console.error(error.message)

  if (
    error.name === 'SequelizeValidationError' ||
    error.name === 'SequelizeUniqueConstraintError'
  ) {
    return res.status(400).json({
      error: error.errors.map(e => e.message)
    })
  }

  res.status(400).json({ error: 'something went wrong' })
})

const start = async () => {
  await connectToDatabase()
  await runMigrations()

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
