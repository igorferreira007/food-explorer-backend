const AppError = require("../utils/AppError")

function verifyUserAuthorization() {
  return (request, response, next) => {
    const { role } = request.user

    if (!role) {
      throw new AppError("Usuário não autorizado", 401)
    }

    return next()
  }
}

module.exports = verifyUserAuthorization