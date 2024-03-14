const knex = require("..//database/knex")

class LoansController {
    async borrowBooks(req,res) {
        const {user_id, book_id} = req.params

        const book = await knex("books").where({id: book_id}).first()
        const user = await knex("users").where({id: user_id}).first()

        if(!book) {
            return res.status(400).json("Livro não encontrado")
        }

        if(!user) {
            return res.status(400).json("Usuário não encontrado!")
        }

        await knex("loans").insert({user_id, book_id})
        await knex("books").where({id: book_id}).update({available: false})

        return res.status(200).json("Empréstimo realizado com sucesso")
    }

    async listBorrowedBooks(req, res) {
        const {user_id} = req.params
        const loans = await knex("loans")
        .where({user_id})
        .innerJoin( "books", "books.id", "loans.book_id")
        .select('books.title', "books.author", "books.pages")
        return res.status(200).json(loans)

    }

    async totalBorroedBooks(req, res) {

        const {user_id} = req.params

        const [total] = await knex("loans").where({user_id}).count({book_id: "book_id"})

        return res.status(200).json(total)
    
    }

    async returnBorrowedBooks(req, res) {
    
        const {user_id, book_id} = req.params

        const book = await knex("books").where({id: book_id}).first()
        const user = await knex("users").where({id: user_id}).first()

        if(!book) {
            return res.status(400).json("Livro não encontrado")
        }

        if(book.available === 1) {
            return res.status(400).json("Este livro já foi devolvido")
        }

        if(!user) {
            return res.status(400).json("Usuário não encontrado!")
        }

        const loans = await knex("loans").where({user_id})

        const findBook = loans.find(loan => loan.book_id == book_id)

        if(findBook.book_id == book_id) {
            await knex("books").update({available: true}).where({id: book_id})
            return res.status(200).json("Livro devolvido com sucesso!")
        };
        
        return res.status(400).json("Operação não realizada!")

    }
}
module.exports = LoansController