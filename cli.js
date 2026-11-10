require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize')

/* const sequelize = new Sequelize('osa13', 'postgres', 'salasana', {
  host: 'localhost',
  dialect: 'postgres'
}) */

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
)

const Blog = sequelize.define('Blog', {
  author: DataTypes.TEXT,
  url: DataTypes.TEXT,
  title: DataTypes.TEXT,
  likes: DataTypes.INTEGER
}, {
  timestamps: false,
  underscored: true,
})

Blog.findAll().then(blogs => {
  blogs.forEach(blog => {
    console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`)
  })
})