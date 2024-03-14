const knex = require("..//database/knex")


class UserController {

    async createUser(req, res) {
    
        const { id, name, email, fone, password } = req.body
           
        const isAdmin =  false

       await knex("users").insert({id, name, email, fone, password, isAdmin})
        return res.status(201).json("Usuário cadastrado com sucesso")
    }

    async listUsers(req, res) {
        const users = await knex("users")  
        return res.status(200).json(users)
    }

    async listUserById(req, res) {       // req(requisiçao), res(uma resposta).
        const {id} = req.params
       
        const users = await knex("users").where({id})
      return res.status(200).json(users)
    }

    async updateUser(req, res) {
        const {id } = req.params
        const { name, email } = req.body

        await knex("users").where({id}).update({name, email})
       return  res.status(200).json("usuario atualizado com sucesso!")
     }

     async updateUserAdmin(req, res) {
        const {id} = req.params

        await knex("users").where({id}).update({isAdmin: true})
        return  res.status(200).json("usuário agora e um adiministrador!")
    }

    async deleteUser(req, res) { 
        const {id } = req.params
        await knex("users").where({id}).delete()
        return res.status(200).json("registro deletado com sucesso!")
    }



}
module.exports = UserController