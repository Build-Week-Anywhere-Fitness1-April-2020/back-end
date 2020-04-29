  
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const authRouter = require('../auth/authRouter');
const classesRouter = require('../classes/classesRouter');
const accountsRouter = require('../accounts/accountsRouter');
const Util = require('./helperModel');
const authenticator = require('../auth/authenticator');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// ADD AUTHENTICATOR BACK JOSIAH
server.use('/auth', authRouter);
server.use('/classes', authenticator, classesRouter);
server.use('/accounts', authenticator, accountsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server up' })
})

server.get('/img-options', (req, res) => {
    Util.getImgOptions()
    .then(imgOptions => {
        res.status(200).json(imgOptions);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error fetching img options from database',
            error: err
        })
    })
})

server.get('/class-types', (req, res) => {
    Util.getClassTypes()
    .then(classTypes => {
        res.status(200).json(classTypes);
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error fetching class types from database',
            error: err
        })
    })
})

module.exports = server;