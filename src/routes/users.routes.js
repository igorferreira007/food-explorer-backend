const { Router } = require("express")
const UsersController = require("../controllers/UsersController")
const UsersValidatedController = require("../controllers/UsersValidatedController")
const UserAvatarController = require("../controllers/UserAvatarController")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const usersRoutes = Router()
const usersController = new UsersController()
const usersValidatedController = new UsersValidatedController()
const userAvatarController = new UserAvatarController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersController.create)
usersRoutes.get("/validated", ensureAuthenticated, usersValidatedController.index)
usersRoutes.put("/", ensureAuthenticated, usersController.update)
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes