const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class DishRepository {
  async findById(id) {
    const dish = await knex("dishes").where({ id }).first()

    return dish
  }

  async findByName(name) {
    const dish = await knex("dishes").where({ name }).first()

    return dish
  }

  async create({ name, description, price, category, ingredients, image }) {
    const [dishId] = await knex("dishes").insert({
      name,
      description,
      price,
      category,
      image,
    })

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        name: ingredient,
        dish_id: dishId,
      }
    })

    if (ingredientsInsert.length !== 0) {
      await knex("ingredients").insert(ingredientsInsert)
    }

    return { id: dishId }
  }

  async show(id) {
    const dish = await knex("dishes").where({ id }).first()
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name")

    return {
      ...dish,
      ingredients,
    }
  }

  async delete(id) {
    const deletedLines = await knex("dishes").where({ id }).delete()

    return deletedLines
  }

  async index({ name, ingredients }) {
    let dishes

    if (ingredients) {
      const filterIngredients = ingredients.split(",").map((ingredient) => ingredient.trim())

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.description",
          "dishes.category",
          "dishes.price",
          "dishes.image",
        ])
        //.whereLike("dishes.name", `%${name}%`)
        .whereRaw('LOWER(dishes.name) LIKE ?', [`%${name.toLowerCase()}%`]) // Case-insensitive search for name
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
        .groupBy("dishes.id")
        .orderBy("dishes.name")
    } else {
      dishes = await knex("dishes")
        //.whereLike("name", `%${name}%`)
        .whereRaw('LOWER(name) LIKE ?', [`%${name.toLowerCase()}%`]) // Case-insensitive search for name
        .orderBy("name")
    }

    const allIngredients = await knex("ingredients")
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredients = allIngredients.filter(ingredient => ingredient.dish_id === dish.id)

      return {
        ...dish,
        ingredients: dishIngredients
      }
    })

    return dishesWithIngredients
  }

  async update({ id, name, description, price, category, ingredients, image }) {
    await knex("dishes").update({ name, description, price, category, image }).where({ id })

    await knex("ingredients").where({ dish_id: id }).delete()

    if (ingredients.length !== 0) {
      await knex("ingredients").insert(ingredients)
    }    

    return {
      name,
      description,
      price,
      category,
      ingredients
    }
  }
}

module.exports = DishRepository
