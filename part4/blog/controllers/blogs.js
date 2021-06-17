const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const logger = require('../utils/logger');



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url){
		return response.status(400).json({
			error : "name or number missing!"
		})
	}
  const blog = new Blog(request.body);

  const result = await blog.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async(request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id);
  console.log(result);
  response.status(204).end();
})

blogRouter.put('/:id', async(request, response) => {
  console.log(request.params.id)
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
  console.log(result);
  response.status(200).end();
})

module.exports = blogRouter;
