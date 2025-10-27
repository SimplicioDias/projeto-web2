const express = require('express')
const app = express()
require('dotenv').config()

const horarioPermitido = require('./middleware/horarioPermitido.js')
const PDFKIT = require('pdfkit')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const loginRouter = require('./routes/loginRouter')
const { type } = require('os')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Middleware  
app.use(horarioPermitido)
app.use(express.static('public'))
app.use(loginRouter)

const verificarJWT = (req, res, next) => {
    let token = (req.body && req.body.token) || req.headers['authorization'] || req.query.token;
    if (!token) {
        return res.status(401).json({ error: true, mensagem: 'Token não enviado' })
    }
    if (typeof token === 'string') {
        token = token.trim();
        if (token.toLowerCase().startsWith('bearer ')) {
            token = token.slice(7).trim();
        }
    }
    jwt.verify(token, process.env.APP_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: true, mensagem: 'Falha na autenticação' })
        }
        req.user = decoded;
        next();
    });
}

var lista = [
    {cod: 1, nome: 'Produto A', qtd:10},
    {cod: 2, nome: 'Produto B', qtd:5}
]
app.post('/logar', (req, res) => {
    try {
        const { email, senha } = req.body
        if (email === process.env.EMAIL && senha === process.env.SENHA) {
            let novoToken = jwt.sign({ email }, process.env.APP_KEY, { expiresIn: 90000 })

            res.json({ logado: true, token: novoToken })
        } else {
            res.json({logado:false, mensagem:'email ou senha incorretos'})
        }
    } catch (error) {
        res.json({logado:false, mensagem:'Erro durante login'})
    }
});

app.use(verificarJWT)

app.post('/inserir', (req, res) => {
    const item = req.body
    lista.push(item)
    res.json({dado:item, mensagem: "Item inserido"})
})

app.delete('/delete/lista/:cod', (req, res) => {
    const cod = Number(req.params.cod)
    const inicial = lista.length
    lista = lista.filter(i => i.cod !== cod)
    if (lista.length === inicial) {
        return res.status(404).json({error:true, mensagem: "Item não encontrado"})
    }
    res.json({ mensagem: "Item removido" })
})

app.get('/lista', (req, res) => {
    res.json(lista)
})

app.get('/lista/:cod', (req, res) => {
    try {
        const codItem = lista.find((item) => {
            return item.cod == req.params.cod
        });
        if (!codItem) return res.status(404).json({error: true, mensagem: "Nenhum item encontrado"})
        res.json(codItem)
    } catch (error) {
        res.json({error: true, mensagem: "Erro ao tentar buscar o item"})
    }
})

app.get('/download/lista', (req, res) => {
    try {
        const pdf = new PDFKIT()
        pdf.text('Lista do Estoque')
        lista.forEach(i => pdf.text(`${i.cod} - ${i.nome} (qtd: ${i.qtd})`))
        pdf.end()
        pdf.pipe(fs.createWriteStream('relatorio_lista.pdf')).on('finish', () => {
            res.download('./relatorio_lista.pdf')
        })
    } catch (error) {
        res.json({mensagem:'Erro na geração do relatório'})
    }
})


app.listen(3000)