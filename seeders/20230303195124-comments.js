'use strict'
const { User, Class, sequelize } = require('../models')
const { Op } = require('sequelize')
const falso = require('@ngneat/falso')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const comments = await Promise.all(
      [...Array(1000)].map(async () => {
        let user = await User.findOne({ order: sequelize.random(), raw: true })
        let lecture = await Class.findOne({
          order: sequelize.random(),
          raw: true
        })
        return {
          userId: user.id,
          classId: lecture.id,
          content: falso.randParagraph(),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    return queryInterface.bulkInsert('comments', comments)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments')
  }
}
