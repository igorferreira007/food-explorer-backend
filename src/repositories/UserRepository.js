const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first()

    return user
  }

  async findById(user_id) {
    const user = await knex("users").where({ id: user_id }).first()

    return user
  }

  async create({ name, email, password }) {    
    const [userId] = await knex("users").insert({
      name,
      email,
      password
    })

    return { id: userId }
  }

  async update({ name, email, newPassword, user_id }) {
    const user = {
      name,
      email,
      password: newPassword
    }

    await knex("users").update({ ...user, updated_at: knex.fn.now() }).where({ id: user_id })

    return user
  }
}

module.exports = UserRepository