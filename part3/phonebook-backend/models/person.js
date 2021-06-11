const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')




const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: false })

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        minLength: 1,
        maxLength: 30,
        required : true,
        unique : true
    },
    number : {
        type : Number,
        min : 10,
        required : true
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        console.log(returnedObject.id)
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Person', personSchema)