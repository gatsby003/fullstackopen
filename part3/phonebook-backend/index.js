// const { request } = require('express')
require("dotenv").config()
// now i can use the process.env
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const Person = require("./models/person")

//middleware
app.use(express.static("build"))
app.use(express.json())
app.use(cors())


// morgan token and middleware
morgan.token("body", (request) => {
	console.log(request.body.name)
	const obj = {
		name : request.body.name,
		number : request.body.number
	}
	return JSON.stringify(obj)
})
app.use(morgan(":method :url :response-time :body "))


app.get("/", (request, response) => {
	console.log(5)
	const obj = {
		"name" : "John Frusciante",
		"band" : "RHCP",
		"guitar" : "fender stratocaster"
	}
	response.json(obj)
})


//added parameters using :, and accessed using request.params.id
app.get("/api/persons/:id", (request, response, next) => {
	Person.findById(request.params.id).then(person => {
		if (person){
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
		.catch(error => next(error))
})

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
		console.log(persons)
		response.json(persons)
	}).catch(error => next(error))
})

app.get("/info", (request, response) => {
	const count = 0
	const persons = Person.collection.stats()
		.then(result =>
			response.send(`<h1>Phonebook has ${result.count} people.</h1><br>${Date()}`))
		.catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response) => {
	Person.findByIdAndRemove(request.params.id).then(result => {
		console.log(result)
		response.status(204).end()
	}).catch(error => {
		next(error)
	})
})

app.post("/api/persons/", (request, response, next) => {
	const body = request.body
	if (!body.name || !body.number){
		return response.status(400).json({
			error : "name or number missing!"
		})
	}

	const person = new Person({
		name : body.name,
		number : body.number,
	})

	person
		.save()
		.then(savedPerson => savedPerson.toJSON())
		.then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
		.catch(error => {
			response.send(error)
			console.log(error)
			next(error)
		})
})

app.put("/api/persons/:id", (request, response) => {
	Person.findByIdAndUpdate(request.body.id, request.body)
		.then(response.status(200).end())
		.catch(error => next(error))
})

// calling at end so it handles requests made to non-existing routes
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error : "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
	console.log(error.message)

	if (error.name == "CastError"){
		return response.status(400).send({ error:"malformed id" })
	} else if (error.name == "ValidationError") {
		return response.status(400).json({ error : error.message })
	}

	next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})