const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError")

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async create({ name, email, password }) {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Este email já esta em uso.")
    }

    if (password.length < 6) {
      throw new AppError("A senha deve ter no mínimo 6 caracteres")
    }

    const hashedPassword = await hash(password, 8)

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })

    return userCreated
  }

  async update({ name, email, newPassword, oldPassword, user_id }) {
    const user = await this.userRepository.findById(user_id)

    if (!user) {
      throw new AppError("Usuário não encontrado.")
    }

    let emailUsed

    if (email) {
      emailUsed = await this.userRepository.findByEmail(email)
    }

    if (emailUsed && emailUsed.id !== user.id) {
      throw new AppError("Este email já esta em uso.")
    }

    user.name = name ?? user.name
    user.email = email ?? user.email

    if (newPassword && !oldPassword) {
      throw new AppError("Informe a senha antiga, para definir a nova senha.")
    }

    if (newPassword && oldPassword) {
      const checkOldPassword = await compare(oldPassword, user.password)

      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      }

      user.password = await hash(newPassword, 8)
    }

    const userUpdated = await this.userRepository.update({
      name: user.name,
      email: user.email,
      newPassword: user.password,
      user_id
    })

    return userUpdated
  }
}

module.exports = UserService