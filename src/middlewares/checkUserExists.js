const knex = require("..//database/knex");


async function checkUserExists(req, res, next) {
    const {id} = req.params
    const user = await knex("users").where({id})

    if(!user) {
        return res.status(400).json("usuario não encontrado")
    }
    next()
}

module.exports = checkUserExists