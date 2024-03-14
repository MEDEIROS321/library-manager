const {Router} = require("express")
const LoansController = require("../controllers//LoansController")

const loansRoutes = Router()
const loansController = new LoansController()

loansRoutes.post("/:user_id/:book_id" , loansController.borrowBooks)
loansRoutes.get("/:user_id", loansController.listBorrowedBooks)
loansRoutes.get("/total/:user_id", loansController.totalBorroedBooks)
loansRoutes.patch("/devolucao/:user_id/:book_id", loansController.returnBorrowedBooks)


module.exports = loansRoutes