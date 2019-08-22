const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db('accounts')
        .then(accounts => {
            res.status(200).json(accounts)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'error getting accounts'
            })
        })
})

server.post('/api/accounts', (req, res) => {
    const accountData = req.body;

    db('accounts').insert(accountData)
        .then(account => {
            res.status(201).json({accountId: account[0]})
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'failed to insert account'
            })
        })
})

server.put('/api/accounts/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db('accounts').where({id}).update(changes)
        .then(account => {
            if(account) {
            res.status(202).json({updated: account})
            } else {
                res.status(404).json({
                    message: 'invalid account id'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'failed to update account'
            })
        })
})

server.delete('/api/accounts/:id', (req, res) => {
    const {id} = req.params;

    db('accounts').where({id}).del()
        .then(account => {
            if(account) {
            res.status(200).json({deleted: account})
            } else {
                res.status(404).json({
                    message: 'invalid account id'
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'failed to delete account'
            })
        })
})

module.exports = server;