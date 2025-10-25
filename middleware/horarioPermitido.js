const confereHorario = (req, res, next) => {
    let date = new Date()
    let dia = { 1: 'domingo', 7: 'sábado' }
    let data = date.getUTCDate()
    if (data == 1 || data <= 6) {
        return res.json ({mensagem: `Não é permitido fazer requições hoje. ${dia.date}`})
    }
    next()
}

module.exports = confereHorario