const { User, Class } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordDigest
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({
      where: { email: email },
      raw: true
    })
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    res.status(401).send({ status: 'Error', msg: 'Incorrect Password' })
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .send({ status: 'Error', msg: 'An error has occurred on Login!' })
  }
}

const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      await user.update({ passwordDigest })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.send({ status: 'Password Updated!', user: payload })
    }
    res
      .status(401)
      .send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const UpdateUserDetails = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updateUserDetails = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updateUserDetails)
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const GetUserById = async (req, res) => {
  try {
    const userId = parseInt(req.params.user_id)
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Class,
          as: 'classes',
          through: { attributes: [] },
          attributes: ['id', 'name', 'credits']
        }
      ]
    })
    res.send(user)
  } catch (error) {
    throw error
  }
}

const DeleteUser = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    await User.destroy({ where: { id: userId } })
    res.send({ message: `Deleted user with an ID of ${userId}!` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  Register,
  Login,
  GetUserById,
  UpdatePassword,
  CheckSession,
  UpdateUserDetails,
  DeleteUser
}
