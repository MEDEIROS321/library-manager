const knex = require("..//database/knex");


async function checkBookExists(req, res, next) {
    const {id} = req.params
    const book = await  knex("books").where({id})
   

    if(book.length === 0) {
        return res.status(400).json("livro não encontrado")
    }
    next()
}

module.exports = checkBookExists