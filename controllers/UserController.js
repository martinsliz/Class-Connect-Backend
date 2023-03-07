const { User } = require('../models')
const middleware = require('../middleware')

const Register = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { firstName, lastName, email, password } = req.body
    // Hashes the provided password
    let passwordDigest = await middleware.hashPassword(password)
    // Creates a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      passwordDigest
    })
    // Sends the user as a response
    res.send(user)
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { email, password } = req.body
    // Finds a user by a particular field (in this case, email)
    const user = await User.findOne({
      where: { email: email },
      raw: true
    })
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      password
    )
    // If they match, constructs a payload object of values we want on the front end
    if (matched) {
      let payload = {
        id: user.id,
        email: user.email
      }
      // Creates our JWT and packages it with our payload to send as a response
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
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    const user = await User.findByPk(req.params.user_id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      user.passwordDigest,
      oldPassword
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
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

const UpdateEmail = async (req, res) => {
  try {
    let userId = parseInt(req.params.user_id)
    let updateEmail = await User.update(req.body, {
      where: { id: userId },
      returning: true
    })
    res.send(updateEmail)
  } catch (error) {
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}
// const CreateUser = async (req, res) => {
//   try {
//     let userBody = { ...req.body }
//     let user = await User.create(userBody)
//     res.send(user)
//   } catch (error) {
//     throw error
//   }
// }

// const GetUsers = async (req, res) => {
//   try {
//     const users = await User.findAll({
//       include: [
//         {
//           model: Class,
//           as: 'classes',
//           through: { attributes: [] },
//           attributes: ['name']
//         },
//         {
//           model: Comment,
//           as: 'commented',
//           attributes: ['content']
//         }
//       ]
//     })
//     res.send(users)
//   } catch (error) {
//     throw error
//   }
// }

const GetUserById = async (req, res) => {
  try {
    const findUser = await User.findByPk(req.params.user_id)
    res.send(findUser)
  } catch (error) {
    throw error
  }
}

// const UpdateUser = async (req, res) => {
//   try {
//     let userId = parseInt(req.params.user_id)
//     let userUpdate = await User.update(req.body, {
//       where: { id: userId },
//       returning: true
//     })
//     res.send(userUpdate)
//   } catch (error) {
//     throw error
//   }
// }

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
  UpdateEmail,
  // CreateUser,
  // GetUsers,
  // UpdateUser,
  DeleteUser
}
