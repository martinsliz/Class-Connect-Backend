const router = require('express').Router()
const controller = require('../controllers/ClassListController')
const middleware = require('../middleware')

router.get('/:classlist_id', controller.GetClassListById)

router.post(
  '/:user_id/:class_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateClassList
)

router.delete(
  '/:user_id/:class_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteClassList
)

module.exports = router
