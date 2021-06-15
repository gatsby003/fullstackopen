const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');

console.log("oh hello");

blogRouter.get('/', (request, response) => {
  console.log("oh hello ji");
  Blog
    .find({})
    .then((blogs) => {
      logger.info(blogs);
      response.json(blogs);
    });
});

blogRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog
    .save()
    .then((result) => {
      logger.info(result);
      response.status(201).json(result);
    });
});

module.exports = blogRouter;
