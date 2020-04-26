//future setup
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config()
console.log(process.env.DATABASE_URL)

const authRouter = require('../auth/authRouter.js');


const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);


module.exports = server;