const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()

const authRouter = require('../auth/authRouter');
const classesRouter = require('../classes/classesRouter');
const authenticator = require('../auth/authenticator');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/auth', authRouter);
server.use('/classes', classesRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: 'Server up' })
})

module.exports = server;