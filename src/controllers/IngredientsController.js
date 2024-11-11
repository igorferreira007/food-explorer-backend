const IngredientsRepository = require("../repositories/IngredientsRepository")
const IngredientsService = require("../services/IngredientsService")

class IngredientsController {
  async index(request, response) {
    const { dish_id } = request.params

    const ingredientsRepository = new IngredientsRepository()
    const ingredientsService = new IngredientsService(ingredientsRepository)
    const ingredients = await ingredientsService.index(dish_id)

    return response.status(201).json(ingredients)
  }
}

module.exports = IngredientsController