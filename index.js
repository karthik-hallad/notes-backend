const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001



var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
//cors support
app.use(cors())


let notes = [{
    id: 1,
    content: "how are you"
}, {
    id: 2,
    content: "i am good"
}]

// app.use((request, response, next) => {
//     console.log('Method:', request.method)
//     console.log('Path:  ', request.path)
//     console.log('Body:  ', request.body)
//     console.log('---')
//     next() //yield control to next method
// })

app.get('/', (req, res) => {
    res.send('<h1>Hello world</h1>')
})

app.get('/api/notes', (request, response) => {
    response.json(notes)
})

app.post('/api/notes', (req, res) => {
    const body = req.body
    // console.log("POST body", body)
    if (!body.content) {
        return res.status(400).json({
            error: "content missinf"
        })
    }
    const note = {
        id: notes.length + 1,
        content: body.content,
        important: Boolean(body.important) || false
    }
    notes.push(note)
    res.status(200).json(note)
})

app.put('/api/notes/:id', (req, res) => {
    const body = req.body
    if (!body.content) {
        return res.status(400).json({
            error: "content missinf"
        })
    }

    // console.log("old note", oldNote)
    // const note = {
    //     id: req.params.id,
    //     content: body.content,
    //     important: body.important
    // }
    notes.forEach((n) => {
        console.log("notes", n)
        if (n.id == req.params.id) {
            n.content = body.content
            n.important = body.important
        }
    })

})

app.delete('/api/notes/:id', (req, res) => {
    notes = notes.filter(note => note.id != req.params.id)
    res.status(204).end()
})

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const note = notes.find(note => note.id == id)
    if (note)
        response.json(note)
    else {
        response.statusMessage = "Id doesnt exist" //set a custom status message
        response.status(404).end()
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



// const http = require('http')

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/plain' })
//   response.end('Hello World')
// })

// const PORT = 3001
// app.listen(PORT)
// console.log(`Server running on port ${PORT}`)