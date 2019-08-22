const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts/', (req, res) => {
  db('accounts')
    .then(accounts => {
      res.json(accounts)
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})



module.exports = server;