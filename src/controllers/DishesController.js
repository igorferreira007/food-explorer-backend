const DishRepository = require("../repositories/DishRepository")
const DishService = require("../services/DishService")

class DishesController {
  async create(request, response) {
    const { name, description, price, category } = request.body
    let { ingredients } = request.body
    const image = request.file ? request.file.filename : null

    ingredients = JSON.parse(ingredients)

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository)
    await dishService.create({ name, description, price, category, ingredients, image })

    return response.status(201).json()
  }

  async show(request, response) {
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository)
    const dish = await dishService.show(id)

    return response.json(dish)
  }

  async delete(request, response) {
    const { id } = request.params

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository)
    const deletedLines = await dishService.delete(id)

    return response.json(deletedLines)
  }

  async index(request, response) {
    const { name, ingredients } = request.query

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository)
    const dishesWithIngredients = await dishService.index({ name, ingredients })

    return response.json(dishesWithIngredients)
  }

  async update(request, response) {
    const { name, description, price, category } = request.body
    let { ingredients } = request.body
    const image = request.file ? request.file.filename : null
    const { id } = request.params

    ingredients = JSON.parse(ingredients)

    const dishRepository = new DishRepository()
    const dishService = new DishService(dishRepository)
    const dishUpdated = await dishService.update({ id, name, description, price, category, ingredients, image })

    return response.json(dishUpdated)
  }
}

module.exports = DishesController