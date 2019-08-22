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

server.get('/api/accounts/:id/', (req, res) => {
  const {id} = req.params

  db('accounts').where({id})
    .then(accounts => {
      const account = accounts[0]

      if (account) {
        res.json(account)
      }else {
        res.status(404).json({ message: 'Invalid account id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

server.post('/api/accounts/', (req, res) => {
  const postData = req.body

  if (!postData.name || !postData.budget) {
    res.status(400).json({ message: 'name and budget fields are required' })
  }else {
    db('accounts').insert(postData)
      .then(id => {
        res.status(201).json(id)
      })
      .catch(err => {
        res.status(500).json({ errorMessage: `${err}` })
      })
  }
})

server.put('/api/accounts/:id', (req, res) => {
  const {id} = req.params
  const changes = req.body

  db('accounts').where({id}).update(changes)
    .then(count => {
      if (count) {
        res.json(count)
      }else {
        res.status(404).json({ message: 'Invalid ID number' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: `${err}` })
    })
})

module.exports = server;