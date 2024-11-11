const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class UserValidatedRepository {
  async findByEmail(email) {
    const user = await knex("users").where({ email }).first()

    return user
  }

  async findById(id) {
    const user = await knex("users").where({ id }).first()

    return user
  }
}

module.exports = UserValidatedRepository