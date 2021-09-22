const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')


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
  console.log(request.token)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)
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
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = Blog.findById(request.params.id)
  console.log(blog)
  
  const result = await Blog.findByIdAndRemove(request.params.id);
  console.log(result)
  response.status(204).end();
})

blogRouter.put('/:id', async(request, response) => {
  console.log(request.params.id)
  const result = await Blog.findByIdAndUpdate(request.params.id, request.body);
  console.log(result);
  response.status(200).end();
})

blogRouter.get('/comments/:id', async(req, res) => {
  const result = await Comment.find({blog : req.params.id})
  res.json(result)
})

blogRouter.post('/comments/:id', async(req, res) => {
  console.log("hi")
  if (!req.body.comment){
		return res.status(400).json({
			error : "empty comment not allowed"
		})
	}
  const comment = new Comment ({
    blog : req.params.id,
    comment : req.body.comment,
  })
  const savedcomment = await comment.save();
  res.status(204).end()
})

module.exports = blogRouter;
