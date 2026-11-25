const { Sequelize } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    const columns = await queryInterface.describeTable('blogs')

    if (!columns.created_at) {
      await queryInterface.addColumn('blogs', 'created_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      })
    }

    if (!columns.updated_at) {
      await queryInterface.addColumn('blogs', 'updated_at', {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      })
    }
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'updated_at')
    await queryInterface.removeColumn('blogs', 'created_at')
  }
}