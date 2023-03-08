const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.post('/login', controller.Login)
router.post('/register', controller.Register)
router.get('/info/:user_id', controller.GetUserById)
router.delete(
  '/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteUser
)
router.put(
  '/updatePassword/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)

router.put(
  '/updateUserDetails/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateUserDetails
)

router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
