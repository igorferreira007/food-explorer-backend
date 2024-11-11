const knex = require("../database/knex")

class IngredientsRepository {
  async index(dish_id) {
    const ingredients = await knex("ingredients").where({ dish_id }).groupBy("name")

    return ingredients
  }
}

module.exports = IngredientsRepository