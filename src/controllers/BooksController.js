const knex = require("..//database/knex")


class BookController {

    async createBook(req, res) {
        const {user_id} = req.params
        const { title, description } = req.body

        const book = {
            author,
            pages,
            description,
            isAvailable: false,
            id_book
        }

        await knex ("books").insert({title:task.title, description:task.description,isCompleted:task.isCompleted,user_id:task.user_id})

        return res.status(201).json("livro criado com sucesso!")
    }


    async listTask(req, res) {
        const [books] = await  knex("books")
         return res.status(200).json(books)
    }

    async listBookById(req, res) {
        const {id} = req.params
        const book = await  knex("books").where({id})
       return res.status(200).json(books)
    }

    async updateBook(req, res) {
        const {id} = req.params
        const {author, description} = req.body

        await knex("books").where({id}).update({author, description})
        return res.status(200).json("livro atualizado com sucesso!")

     }
    
    async updateBookStatus(req, res) {
        const {id} = req.params

         await knex("books").where({id}).update({isAvailable: true})
       return  res.status(200).json("status alterado com secesso!")
    }

    async deleteBook(req, res) { 
        const {id} = req.params
        
        await knex("books").where({id}).delete()
            return res.status(200).json("livro deletado com sucesso!")
    }

}

module.exports = BookController