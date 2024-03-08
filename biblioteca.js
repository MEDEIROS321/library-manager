const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

app.use(express.json())

const livrosb = [];

const users = [];



// criação dos livros
app.post("/paginaprincipal", (req, res) => {
    const { titulo, autor, paginas, categoria, disponivel } = req.body

    const informaçoes = {

        id: uuidv4(),
        titulo,
        autor,
        paginas,
        categoria,
        disponivel: true

    }
    livrosb.push(informaçoes)
    console.log(livrosb)
    return res.status(201).json(informaçoes)

})

// lista de livros
app.get("/listagemdelivro", (req, res) => {
    return res.status(201).json(livrosb)


})


//lista de usuarios
app.get("/listagemdeusuario", (req, res) => {
    return res.status(201).json(users)

})

//informações do usuario
app.post("/users", (req, res) => {
    const { nome, email, telefone, listadeemprestimos } = req.body
    const user = {
        id: uuidv4(),
        nome,
        email,
        telefone,
        listadeemprestimos: []

    }


    users.push(user)
    return res.status(201).json(users)

})


//listagem de emprestimo dos livros
app.patch("/listadeemprestimos/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.headers
    const user = users.find(user => user.nome === nome)

    if (!user) {
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user


    const livro = livrosb.find(livro => livro.id === id)



    if (livro.disponivel === true) {
        const limete = user.listadeemprestimos.length >= 3
        if (limete) {
            return res.status(400).json("limite excedido")
        }
        else {
            user.listadeemprestimos.push(livro)
            livro.disponivel = false
            return res.status(200).json("Adicionado com sucesso!")
        }

    }

    else {
        res.status(400).json("livro indisponivel")

    }
})


// codigo para devoluçao/exclusao do livro da minha lista de emprestimo
app.patch("/devolucao/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.headers
    const user = users.find(user => user.nome === nome)

    if (!user) {
        res.status(400).json("Usuário não cadastrado, erro 404")
    }
    req.user = user

    const Indexlivro = user.listadeemprestimos.findIndex(livro => livro.id === id)
    const livro = livrosb.find(livro => livro.id === id)

    if (Indexlivro == -1) {
        return res.status(400).json("Você não tem livros para devolução!")
    }
    user.listadeemprestimos.splice(Indexlivro, 1)
    livro.disponivel = true

    return res.status(200).json("Livro devonvido com sucesso!")
})


//codigo para colsultar/pesquisar pelo livro

app.get("/consultalivros", (req, res) => {
    const { titulo, autor, categoria } = req.query

    if (titulo) {
        result = livrosb.filter(livro => livro.titulo.includes(titulo))
    }
    if (autor) {
        result = livrosb.filter(livro => livro.autor.includes(autor))
    }
    if (categoria) {
        result = livrosb.filter(livro => livro.categoria.includes(categoria))
    }
    res.status(200).json(result)
})







































app.use((err, req, res, next) => { //err(erro), req(requesiçao), res(resposta), next()
    console.error(err.stack);
    res.status(500).send("Algo deu errado!")
})


// porta para rodar
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
