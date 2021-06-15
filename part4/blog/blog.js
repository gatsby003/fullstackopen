const mongoose = require('mongoose');

const url = 'mongodb+srv://fullstack:thebluebird123@fullstackopen.9c97m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

const Blog = mongoose.model('Blog', blogSchema);

const blog = new Blog({
  title: 'Witch Hunting in the 16th century was pointless',
  author: 'Harry Potter',
  url: 'thisiswitchcraft.com',
  likes: 69,
});

blog.save().then(result => {
  console.log('blog saved');
  mongoose.connection.close();
});





