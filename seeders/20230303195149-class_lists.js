'use strict'
const { User, Class, sequelize } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const list = await Promise.all(
      [...Array(1000)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let lecture = await Class.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          userId: user.id,
          classId: lecture.id,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    await queryInterface.bulkInsert('class_lists', list)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('class_lists')
  }
}
