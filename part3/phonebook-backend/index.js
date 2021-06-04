const { request } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')



//middleware
app.use(express.json())
app.use(cors())

// morgan token and middleware
morgan.token('body', (request) => {
    console.log(request.body.name);
    const obj = {
        name : request.body.name,
        number : request.body.number
    }
    return JSON.stringify(obj)
})
app.use(morgan(':method :url :response-time :body '))



let persons = [
    {
        id : 1,
        name: "Arto Hellas",
        number : "040-123456"
    },
    {
        id : 2,
        name : "Ada Lovelace",
        number : "39-43-234345"
    },
    {
        id : 3,
        name : "Dan Abramov",
        number : "38-45-454545"
    },
    {
        id : 4,
        name : "Abel Danger",
        number : "54-85-898954"
    }
]


app.get("/", (request, response) => {
    console.log('you')
    const obj = {
        "name" : "John Frusciante",
        "band" : "RHCP",
        "guitar" : "fender stratocaster"
    }
    response.json(obj)
})


//added parameters using :, and accessed using request.params.id
app.get("/api/persons/:id", (request, response) => {
    const query = Number(request.params.id)
    const person = persons.find(person => person.id === query)
    if (query){
        response.json(person)
    }else{
        response.status(404).end()
    } 
})

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const people = `<h1>Phonebook has ${persons.length} people.</h1><br>${Date()}`
    response.send(people)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    console.log(id);
    persons = persons.filter(person => person.id !== id)
    console.log(persons);
    response.status(204).end()
})

app.post("/api/persons/", (request, response) => {
    const body = request.body
    if (!body.name || !body.number){
        return response.status(400).json({
            error : "name or number missing!"
        })
    }

    if (persons.find(person => person.name === body.name)){
        return response.status(400).json(
            {
                error : "name already exists"
            }
        )
    }
    
    const obj = {
        id : Math.floor(Math.random() * 100),
        name : body.name,
        number : body.number,
    }
    console.log(obj.id);
    persons = persons.concat(obj)

    response.json(obj)
})

// calling at end so it handles requests made to non-existing routes
const unknownEndpoint = (request, response) => {
    response.status(404).send({error : "unknown endpoint"})
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001


app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})