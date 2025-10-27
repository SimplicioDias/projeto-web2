const loginRouter = require('express').Router()

var logins = [
    {email:'Simplicio@test.com', senha:'123'},
    {email:'Micael@test.com', senha:'456'},
    {email:'Ivine@test.com', senha:'789'},
]


loginRouter.get('/login/todos', (req, res) => {
    try {
        res.json(logins)
    } catch (error) {
        res.json({erro: true, mensagem: 'Não foi possivel recuperar os dados.'})
    }
})

loginRouter.get('/login/:email', (req, res) => {
    try {
        const loginEncontrado = logins.find( (item) => {
            return item.nome === req.params.nome
        })
        res.json(loginEncontrado)
    } catch (error) {
        res.json({erro: true, mensagem: 'Não foi possivel recuperar os dados.'})
    }
})

loginRouter.post('/login', (req, res) => {
    try {
        const { email, senha } = req.body
        const loginEncontrado = logins.find(l => l.email === email && l.senha === senha)
        if (!loginEncontrado) {
            return res.json({sucesso:true, mensagem:'logado', usuario: {email: loginEncontrado.email}})
        }
    } catch (error) {
        res.json({erro: true, mensagem: 'Erro ao logar'})
    }
})


module.exports = loginRouter