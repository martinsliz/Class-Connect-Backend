'use strict'
const { User, Class } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll({ raw: true })
    const classes = await Class.findAll({ raw: true })
    const list = classes.map((a) => ({
      userId: users[Math.floor(Math.random() * users.length)].id,
      classId: a.id
    }))
    await queryInterface.bulkInsert('class_lists', list)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('class_lists')
  }
}
