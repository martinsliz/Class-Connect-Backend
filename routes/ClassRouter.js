const router = require('express').Router()
const controller = require('../controllers/ClassController')
// const middleware = require('../middleware')

router.get('/', controller.GetClasses)
router.post(
  '/',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.CreateClass
)
router.get(
  '/:class_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.GetClassById
)
router.put(
  '/:class_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.UpdateClass
)
router.delete(
  '/:class_id',
  // middleware.stripToken,
  // middleware.verifyToken,
  controller.DeleteClass
)

module.exports = router
