const UserValidatedRepository = require("../repositories/UserValidatedRepository")
const UserValidatedService = require("../services/UserValidatedService")

class UsersValidatedController {
  async index(request, response) {
    const { user } = request
    
    const userValidatedRepository = new UserValidatedRepository()
    const userValidatedService = new UserValidatedService(userValidatedRepository)
    await userValidatedService.index(user.id)

    return response.status(200).json()
  }
}

module.exports = UsersValidatedController