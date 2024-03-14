const {Router} = require ("express")

const userRoutes = require("./users.routes")
const bookRoutes = require("./books.routes")
const loansRoutes = require("./loans.routes")

const routes = Router()

routes.use("/", bookRoutes)
routes.use("/", userRoutes)
routes.use("/", loansRoutes)

module.exports = routes