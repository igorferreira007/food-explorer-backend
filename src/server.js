require("dotenv/config")
require("express-async-errors")
const express = require("express")
const app = express()
const routes = require("./routes")
const AppError = require("./utils/AppError")
const database = require("./database/sqlite")
const uploadConfig = require("./configs/upload")
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173/"],
  credentials: true
}))

app.use(express.json())

app.use(cookieParser())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)
database()

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))