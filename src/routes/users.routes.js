const {Router} = require ("express")
const UserController = require ("../controllers/UserController")

const checkUserExists = require("../middlewares/checkUserExists")
 

const userRoutes = Router()

const userController = new UserController()




userRoutes.post("/users",userController.createUser)
userRoutes.get("/userlist", userController.listUsers)
userRoutes.get("/users/:id", checkUserExists, userController.listUserById)
userRoutes.put("/users/:id", checkUserExists, userController.updateUser)
userRoutes.patch("/users/status/:id", checkUserExists, userController.updateUserAdmin)
userRoutes.delete("/users/:id", checkUserExists, userController.deleteUser)


module.exports = userRoutes
