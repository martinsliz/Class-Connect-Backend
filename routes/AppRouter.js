const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const ClassRouter = require('./ClassRouter')
const CommentRouter = require('./CommentRouter')
Router.use('/users', UserRouter)
Router.use('/classes', ClassRouter)
Router.use('/comments', CommentRouter)
module.exports = Router
