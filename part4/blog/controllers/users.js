const userRouter = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.post('/', async (request, response) => {
    const body = request.body

    // validation
    if (body.password.length < 5){
        console.log('error gang')
            response.status(400).json({
                error : "Password length must be greater than 5"
            })
        }

    //read up on password hashing!
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds).catch(error => console.log(error))
    console.log(passwordHash)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
      })

    const savedUser = await user.save()
    
    response.json(savedUser)
}) 

userRouter.get('/', async (request, response) => {
    const body = request.body
    const users = await User
        .find({}).populate('blogs')
    response.json(users)

})

module.exports = userRouter