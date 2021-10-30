const Nota = require('../models/anotacao')

module.exports = app => {
    app.get('/anotacao', (req, res) => {
        Nota(req, res),  Nota.lista(res)
    })
    app.post('/anotacao', (req, res) => {
        console.log("deu post")
        const nota = req.body
        Nota.adiciona(nota, res)
    })
    
}