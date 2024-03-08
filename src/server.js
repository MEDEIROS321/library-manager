const express = require('express')

const app = express()

app.use(express.json())

app.use((err, req, res, next) => { //err(erro), req(requesiçao), res(resposta), next()
    console.error(err.stack);
    res.status(500).send("Algo deu errado!")
})

// porta para rodar
const PORT = 3333

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})
