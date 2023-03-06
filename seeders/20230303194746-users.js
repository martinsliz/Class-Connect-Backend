'use strict'
const middleware = require('../middleware')
const falso = require('@ngneat/falso')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await Promise.all(
      [...Array(100)].map(async () => {
        let password = falso.randPassword()
        let password_digest = await middleware.hashPassword(password)
        return {
          firstName: falso.randFirstName(),
          lastName: falso.randLastName(),
          email: falso.randEmail(),
          passwordDigest: password_digest,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    )
    return queryInterface.bulkInsert('users', users)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users')
  }
}
