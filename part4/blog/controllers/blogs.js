const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username : 1, name : 1});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  if (!request.body.title || !request.body.url){
		return response.status(400).json({
			error : "name or number missing!"
		})
	}

  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes,
    user : user._id,
  })

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save()

  response.status(201).json(savedBlog);

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
