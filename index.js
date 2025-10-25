const express = require('express')
const app = express()

const horarioPermitido = require('./middleware/horarioPermitido.js')
const jwt = require('jsonwebtoken')
app.use(express.json)
app.use(express.urlencoded({ extended: true }))

//Middleware
app.use(horarioPermitido)

const verificarJWT = (req, res, next) => {
    const token = req.body.token;
    if (!token) {
        throw "Token não foi enviado";
    } 
    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if (err) {
            throw "Falha na autenticação";
        }
    });
    next();
}

var logins = [
    {email:'Simplicio@test.com', senha:'123'},
    {email:'Micael@test.com', senha:'456'},
    {email:'Ivine@test.com', senha:'789'},
]

app.post('/logar', (req, res) => {
    try {
        const { email, senha } = req.body
        if (email === process.env.EMAIL && senha === process.env.SENHA) {
            let novoToken = jwt.sign({ email }, process.env.APP_KEY, { expiresIn: 9000 })

            res.json({ logado: true, token: novoToken })
        } else {
            res.json({logado:false, mensagem:'email ou senha incorretos'})
        }
    } catch (error) {
        res.json({logado:false, mensagem:'Erro durante login'})
    }
});

app.post('/inserir', (req, res) => {
    res.json({dado:req.body})
})

app.delete('/lista', (req, res) => {
    pass
})

app.get('/lista', (req, res) => {
    res.json()
})

app.get('/lista/:cod', (req, res) => {
    try {
        const codItem = lista.find((item) => {
            return item.cod == req.params.cod
        });
        res.json(codItem)
    } catch (error) {
        res.json({error: true, mensagem: "Nenhum item encontrado"})
    }
})

app.get('/dowload', (req, res) => {
    res.download('recursos/lista.pdf')
})



loginRouter.get('/logar/:email/:senha', (req, res) => {
    try {
        const loginEncontrado = login.find((item1,item2) => {
            return item1.email == req.params.email && item2.senha == req.params.senha
        })
        res.json(loginEncontrado)

    } catch (error) {
        res.json({error: true, mensagem: 'Não foi possível recupar os dados.'})
    }
})





app.listen(3000)