const {Router} = require ("express")
const BookController = require("../controllers/BooksController")
const checkBookExists = require("../middlewares/checkUserExists")



const bookRoutes = Router()
const bookController = new BookController()

bookRoutes.post("/books", bookController.createBook) // rota para criar a tarefa
bookRoutes.get("/books", bookController.listBook) // rota para listar a tarefa
bookRoutes.get("/books/:id", checkBookExists, bookController.listBookById) // rota utilizada para adicionar o id(para quando quiser buscar um id expecifico)
bookRoutes.put("/books/:id", checkBookExists, bookController.updateBook) // rota para atualizar dados
bookRoutes.patch("/books/status/:id", checkBookExists, bookController.updateBookStatus) // rota para atualizar o status da tarefa, de false par true(completa)
bookRoutes.delete("/books/:id", checkBookExists, bookController.deleteBook) // rota para deletar dados 


module.exports = bookRoutes