module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('blogs', 'year', {
      type: Sequelize.INTEGER
    })
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year')
  }
}

const { Sequelize } = require('sequelize')