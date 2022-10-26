const express = require('express')
const app = express()
let port = process.env.port || 3000

let personas = require("./personas")

app.use(express.static("public"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/personas", (req, res) => {
    res.send(personas)
})

app.post("/add", (req, res) => {
    let persona = req.body
    personas.push(persona)
    res.send({message: "OK", status: 200})
})

app.put("/update", (req, res) => {
    let i = personas.findIndex(persona => persona.nombre === req.body.nombre)

    if (i < 0) {
        res.send({message: "Nombre no encontrado", status: 400})
    } else {
        personas[i] = req.body
        res.send({message: "OK", status: 200})
    }
})

app.delete("/delete", (req, res) => {
    let i = personas.findIndex(persona => persona.nombre === req.body.nombre)

    if (i < 0) {
        res.send({message: "Nombre no encontrado", status: 400})
    } else {
        personas.splice(i, 1)
        res.send({message: "OK", status: 200})
    }
})

app.listen(port, err =>
    err 
    ? console.error("No se ha podido conectar")
    : console.log("Escuchando en puerto " + port)
)