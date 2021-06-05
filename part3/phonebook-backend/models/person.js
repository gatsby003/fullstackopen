const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: false })

const personSchema = new mongoose.Schema({
    name : String,
    number : String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        console.log(returnedObject.id)
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)