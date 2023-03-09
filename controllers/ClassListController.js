const { ClassList } = require('../models')

const GetClassListById = async (req, res) => {
  try {
    const classListId = parseInt(req.params.classlist_id)
    const classList = await ClassList.findOne({
      where: { id: classListId }
    })
    res.send(classList)
  } catch (error) {
    throw error
  }
}

const CreateClassList = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let classId = parseInt(req.params.class_id)
    let classListBody = {
      userId,
      classId
    }
    let classList = await ClassList.create(classListBody)
    res.send(classList)
  } catch (error) {
    throw error
  }
}

const DeleteClassList = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let classId = parseInt(req.params.class_id)
    await ClassList.destroy({ where: { userId: userId, classId: classId } })
    res.send({
      message: `Deleted class list with an user id of ${userId} and class id of ${classId} `
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetClassListById,
  CreateClassList,
  DeleteClassList
}
