const { Class, User, Comment } = require('../models')
const sequelize = require('sequelize')
const { Op } = require('sequelize')

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
    const lecture = await Class.findAll({
      where: {
        subject: sequelize.where(
          sequelize.fn('LOWER', sequelize.col('subject')),
          'LIKE',
          classSubject.toLowerCase() + '%'
        )
      }
    })
    res.send(lecture)
  } catch (error) {
    throw error
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
    // res.send({ msg: `Class with id of ${classId} was deleted` })
    res.send({ msg: 'Class Deleted', payload: classId, status: 'Ok' })
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
