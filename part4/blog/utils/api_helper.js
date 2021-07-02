const Blog = require('../models/blog')

const getAll = async () => {
    const blogs = await Blog.find({})
    console.log(blogs)
    return blogs.map(blog => blog.toJSON())
}

const getTotalNumber = async () => {
    const number = await Blog.collection.stats()
    return number.count
}

module.exports = {
    getAll,
    getTotalNumber
}