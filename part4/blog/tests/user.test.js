const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)
const mongoose = require('mongoose')

describe('sets up state of db before testing', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({name: 'mrobot', username: 'root', passwordHash})

        await user.save()
    })

    test('tests creation of user', async () => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart.length)

        const newUser = {
            username: 'mluukkai1',
            name: 'Matti Luukkainen1',
            password: 'salainen1',
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        console.log(usersAtEnd.length)

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })


    test('tests invalid user rejection', async () => {
        const usersAtStart = await helper.usersInDb()
        console.log(usersAtStart.length)

        const newUser = {
            username: 'mluukkai1',
            name: 'Matti Luukkainen1',
            password: 's',
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    
        const usersAtEnd = await helper.usersInDb()

        expect(usersAtEnd).toHaveLength(usersAtStart.length)

    })
})

afterAll(() => {
    mongoose.connection.close();
})
