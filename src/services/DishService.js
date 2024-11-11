const AppError = require("../utils/AppError")
const DiskStorage = require("../providers/DiskStorage")

class DishService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository
  }

  async create({ name, description, price, category, ingredients, image }) {
    const dishAlreadyExists = await this.dishRepository.findByName(name)
    const diskStorage = new DiskStorage()

    if (dishAlreadyExists) {
      await diskStorage.deleteFileTmp(image)
      
      throw new AppError("Esse prato já existe.")
    }

    const filename = image ? await diskStorage.saveFile(image) : null

    const dishCreated = await this.dishRepository.create({ name, description, price, category, ingredients, image: filename })

    return dishCreated
  }

  async show(id) {
    const dish = await this.dishRepository.show(id)

    return dish
  }

  async delete(id) {
    const dish = await this.dishRepository.findById(id)

    const deletedLines = await this.dishRepository.delete(id)

    if (dish.image) {
      const diskStorage = new DiskStorage()
      await diskStorage.deleteFile(dish.image)
    }
    
    return deletedLines
  }

  async index({ name, ingredients }) {
    const dishesWithIngredients = await this.dishRepository.index({ name, ingredients })

    return dishesWithIngredients
  }

  async update({ id, name, description, price, category, ingredients, image }) {
    const checkDishesExists = await this.dishRepository.findById(id)
    const diskStorage = new DiskStorage()

    let filename

    if (checkDishesExists.image && image) {
      await diskStorage.deleteFile(checkDishesExists.image)
      filename = await diskStorage.saveFile(image)
    } else if (!checkDishesExists.image && image) {
      filename = await diskStorage.saveFile(image)
    } else if (checkDishesExists.image && !image) {
      filename = checkDishesExists.image
    }

    name = name ?? checkDishesExists.name
    description = description ?? checkDishesExists.description
    price = price ?? checkDishesExists.price
    category = category ?? checkDishesExists.category

    const updatedIngredients = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id: id
      }
    })

    const dishUpdated = await this.dishRepository.update({ id, name, description, price, category, ingredients: updatedIngredients, image: filename })

    return dishUpdated
  }
}

module.exports = DishService