const mongoose = require('mongoose')

if (process.argv.length < 3){
    console.log("Correct usage : node mongo.js <password>")
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.9c97m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

    mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: false })


const personSchema = new mongoose.Schema({
    name : String,
    number : String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3){

    Person.find({}).then(result => {
        console.log('The Phonebook')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
    })
    .catch(error => {
        console.log(error)
    })

}
    else if (process.argv.length == 5){
        const name = process.argv[3]
        const number = process.argv[4]

        const person = new Person({
            name : name,
            number : number
        })

        person.save().then(result => {
            console.log(`Added ${person.name} number ${person.number} to phonebook.`)
            mongoose.connection.close()
        }).catch(error => {
            console.log(error)
        })

}





