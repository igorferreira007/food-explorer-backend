const { Router } = require("express")
const DishesController = require("../controllers/DishesController")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const dishesRoutes = Router()
const dishesController = new DishesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization")
const upload = multer(uploadConfig.MULTER)

dishesRoutes.use(ensureAuthenticated)

dishesRoutes.post("/", upload.single("image"), verifyUserAuthorization(), dishesController.create)
dishesRoutes.get("/:id", dishesController.show)
dishesRoutes.delete("/:id", verifyUserAuthorization(), dishesController.delete)
dishesRoutes.get("/", dishesController.index)
dishesRoutes.put("/:id", upload.single("image"), verifyUserAuthorization(), dishesController.update)

module.exports = dishesRoutes