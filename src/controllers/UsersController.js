const UserRepository = require("../repositories/UserRepository")
const UserService = require("../services/UserService")

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    await userService.create({ name, email, password })

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, newPassword, oldPassword } = request.body
    const user_id = request.user.id

    const userRepository = new UserRepository()
    const userService = new UserService(userRepository)
    const userUpdated = await userService.update({ name, email, newPassword, oldPassword, user_id })

    return response.status(201).json(userUpdated)
  }
}

module.exports = UsersController