const {Router} = require ("express")

const userRoutes = require("./users.routes")
const taskRoutes = require("./tasks.routes")

const routes = Router()

routes.use("/", taskRoutes)
routes.use("/", userRoutes)

module.exports = routes