const express = require('express');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogRouter = require('./controllers/blogs');

logger.info('connecting to', config.MONGODB_URI);

const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl, {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
}).catch((error) => logger.error(error));

app.use(cors());
app.use(express.json());
app.use('/api/blogs', blogRouter);

module.exports = app;
