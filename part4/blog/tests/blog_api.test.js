const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const checkId = require('../utils/list_helper').checkId
const helper = require('../utils/api_helper')

const api = supertest(app);

test('blog entries are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id of blogs is a string not _id', async () => {
    const blogs = await api.get('/api/blogs/')
    expect(checkId(blogs.body)).toBe(true);
})

test('verifies post request to url is succesful', async () => {
    const newBlog = {
        title: "Books better than movies",
        author: "Hermione Granger",
        url: "booksgood.com",
        likes: 0
    }
    const intitialLength = await helper.getTotalNumber();

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const finalLength = await helper.getTotalNumber();
    expect(intitialLength + 1).toEqual(finalLength)

})


test('verifies that blog with no like field is set to 0 likes', async() => {
    const newBlog = {
        title: "Books better than movies",
        author: "Hermione Granger",
        url: "booksgood.com",
    }

    const result = await api
                .post("/api/blogs")
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)
    expect(result.body.likes).toEqual(0)

})

test('checks if title and url requirement is satisfied', async () => {
    const newBlog = {
        author: "Hermione Granger",
    }

    const result = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

afterAll(() => {
    mongoose.connection.close();
})
