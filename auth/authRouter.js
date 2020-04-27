const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const User = require('./authModel');

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Auth endpoint up' })
})

router.post('/register', validateRegisterBody, (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    req.body.password = hash;

    /*
        Expect
        {
            username: text(at least 6 chars),
            email: text,
            password: text(at least 8 chars),
            roles: [instructor || client](at least 1 element)
        }
        // DO NOT pass roles to the account DB
    */
   User.addAccount({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password
   })
   .then(async id => {
       for(let i=0; i<req.body.roles.length; i++){
            let roleId;
            if(req.body.roles[i] === 'instructor'){
                roleId = 1;
            }else{
                roleId = 2;
            };
            await User.addAccountRoles({
                accountId: id[0],
                roleId: roleId
            })
       };
       res.status(201).json({ 
           message: 'User successfully added to database' 
        });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

router.post('/login', validateLoginBody, (req, res) => {
    const { username, password } = req.body;
    User.getByUsername(username)
    .then(user => {
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const token = generateToken(user);
                res.status(201).json({
                    token: token,
                    role: req.body.role
                })
            }else{
                res.status(400).json({
                    message: 'Invalid credentials'
                })
            }
        }else{
            res.status(401).json({
                message: 'User does not exist'
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

function validateRegisterBody(req, res, next){
    const body = req.body;
    if(body.username.length > 6 || body.email.length > 1 || body.password.length > 8 || body.roles.length > 1){
        next();
    }else{
        res.status(401).json({ 
            message: 'A field is missing or too short' 
        });
    }
}

function validateLoginBody(req, res, next){
    const body = req.body;
    if(body.username.length > 1 || body.password.length > 1 || body.role.length > 1){
        next();
    }else{
        res.status(401).json({
            message: 'A field is missing'
        })
    }
}

module.exports = router;