const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
} = require('./config')

const sequelize = process.env.TESTING === 'true'
  ? new Sequelize(process.env.TEST_DATABASE_URL, {
      dialect: 'postgres'
    })
  : new Sequelize(
      DB_NAME,
      DB_USER,
      DB_PASSWORD,
      {
        host: DB_HOST,
        port: DB_PORT,
        dialect: 'postgres'
      }
    )

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

const migrator = new Umzug({
  migrations: {
    glob: 'migrations/*.js'
  },
  storage: new SequelizeStorage({
    sequelize,
    tableName: 'migrations'
  }),
  context: sequelize.getQueryInterface(),
  logger: console
})

const runMigrations = async () => {
  await migrator.up()
}

module.exports = {
  connectToDatabase,
  sequelize,
  runMigrations
}
