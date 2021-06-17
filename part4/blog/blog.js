const mongoose = require('mongoose');
const Blog = require('./models/blog');

const url = 'mongodb+srv://gatsby:thebluebird123@cluster0.psmcz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blog = new Blog({
  author: 'Harry Potter',
});

blog.save().then(result => {
  console.log('blog saved');
  mongoose.connection.close();
});





