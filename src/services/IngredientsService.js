class IngredientsService {
  constructor(ingredientRepository) {
    this.ingredientRepository = ingredientRepository
  }

  async index(dish_id) {
    const ingredients = await this.ingredientRepository.index(dish_id)

    return ingredients
  }
}

module.exports = IngredientsService