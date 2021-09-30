require('dotenv').config()
const express = require('express');
const { logger } = require('./middleware/middleware.js')
const server = express();
const usersRouter = require('./users/users-router')
const cors = require('cors')
server.use(express.json());
server.use(cors())
server.use(logger);

server.get('/api/hello', (req, res) =>{
  res.json({ message: 'api is working' })
})

server.use('/api/users', usersRouter)

// global middlewares and the user's router need to be connected here

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use ((err, req, res, next) =>{ // eslint-disable-line
  res.statsu(500).json({
      message: err.message, 
      stack: err.stack, 
  })
})

module.exports = server;