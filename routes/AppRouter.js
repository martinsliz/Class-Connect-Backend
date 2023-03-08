const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const ClassRouter = require('./ClassRouter')
const CommentRouter = require('./CommentRouter')
const ClassListRouter = require('./ClassListRouter')

Router.use('/users', UserRouter)
Router.use('/classes', ClassRouter)
Router.use('/comments', CommentRouter)
Router.use('/classlists', ClassListRouter)

module.exports = Router
