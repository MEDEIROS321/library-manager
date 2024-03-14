const knex = require("..//database/knex")


class BookController {

    async createBook(req, res) {
    
        const { title, author, pages, category } = req.body

        const book = {
            title,
            author,
            pages,
            category,
            available: true,
           
        }

        await knex ("books").insert({title:book.title, author:book.author, pages:book.pages, category:book.category,available:book.available})

        return res.status(201).json("livro criado com sucesso!")
    }


    async listBook(req, res) {
        const books = await  knex("books")
         return res.status(200).json(books)
    }

    async listBookById(req, res) {
        const {id} = req.params
        const books = await  knex("books").where({id})
       return res.status(200).json(books)
    }

    async updateBook(req, res) {
        const {id} = req.params
        const {author, title} = req.body

        await knex("books").where({id}).update({author, title})
        return res.status(200).json("livro atualizado com sucesso!")

     }
    
    async updateBookStatus(req, res) {
        const {id} = req.params

         await knex("books").where({id}).update({available: true})
       return  res.status(200).json("status alterado com secesso!")
    }

    async deleteBook(req, res) { 
        const {id} = req.params
        
        await knex("books").where({id}).delete()
            return res.status(200).json("livro deletado com sucesso!")
    }

}

module.exports = BookController