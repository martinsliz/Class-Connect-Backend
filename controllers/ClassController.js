const { Class, User, Comment } = require('../models')

const GetClasses = async (req, res) => {
  try {
    const classes = await Class.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: User,
          as: 'students',
          through: { attributes: [] },
          attributes: ['firstName']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['content']
        }
      ]
    })
    res.send(classes)
  } catch (error) {
    throw error
  }
}

const GetClassById = async (req, res) => {
  try {
    const classId = parseInt(req.params.class_id)
    const lecture = await Class.findByPk(classId, {
      include: [
        {
          model: User,
          as: 'students',
          through: { attributes: [] },
          attributes: ['firstName']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['content']
        }
      ]
    })
    res.send(lecture)
  } catch (error) {
    throw error
  }
}

const getClassBySubject = async (req, res) => {
  try {
    const classSubject = req.params.class_subject
    const lecture = await Class.find({
      subject: { $regex: `${classSubject}`, $options: 'i' }
    })
    if (lecture) {
      return res.status(200).json({ lecture })
    }
    return res
      .status(404)
      .send('Classes with the specified Subject does not exists')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const CreateClass = async (req, res) => {
  try {
    let lecture = await Class.create({ ...req.body })
    res.send(lecture)
  } catch (error) {
    throw error
  }
}

const UpdateClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.class_id)
    let updatedClass = await Class.update(req.body, {
      where: { id: classId },
      returning: true
    })
    res.send(updatedClass)
  } catch (error) {
    throw error
  }
}

const DeleteClass = async (req, res) => {
  try {
    const classId = parseInt(req.params.class_id)
    await Class.destroy({ where: { id: classId } })
    res.send({ msg: `Class with id of ${classId} was deleted` })
    // res.send({ msg: 'Class Deleted', payload: classId, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetClasses,
  GetClassById,
  getClassBySubject,
  CreateClass,
  UpdateClass,
  DeleteClass
}
