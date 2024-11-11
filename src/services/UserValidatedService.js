const AppError = require("../utils/AppError")

class UserValidatedService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async index(id) {
    const checkUserExists = await this.userRepository.findById(id)

    if (checkUserExists.length === 0) {
      throw new AppError("Não autorizado", 401)
    }
  }
}

module.exports = UserValidatedService