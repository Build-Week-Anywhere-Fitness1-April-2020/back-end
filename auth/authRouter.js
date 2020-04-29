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
            displayName: text,
            gender: text(optional),
            roles: [instructor || client](at least 1 element)
        }
        // DO NOT pass roles to the account DB
    */
   User.addAccount({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password,
       displayName: req.body.displayName ? req.body.displayName : req.body.username,
       gender: req.body.gender ? req.body.gender : 'none'
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

router.post('/login', validateLoginBody, validateRole, (req, res) => {
    const { username, password, role } = req.body;
    User.getByUsername(username)
    .then(user => {
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                const token = generateToken(user, role);
                res.status(201).json({
                    token: token,
                    role: req.body.role,
                    user: {
                        ...user,
                        password: undefined
                    }
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
    const {username, password, roles, email} = req.body;
    User.getByUsername(req.body.username)
    .then(user=> {
        // Look for a duplicate username
        if(user){
            res.status(400).json({
                message: 'Username already exists'
            })
        }else{
            // Make sure required fiels are present
            if(!username || !password || !roles || !email){
                res.status(401).json({
                    message: 'Missing field',
                })
            }else{
                next();
            }
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'Error registering user to database',
            error: err
        })
    });
}

function validateLoginBody(req, res, next){
    const {username, password, role}= req.body;
    if(!username || !password || !role){
        res.status(401).json({
            message: 'A field is missing'
        })
    }else{
        next();
    }
}

async function validateRole(req, res, next){
    const user = await User.getByUsername(req.body.username);
    const roles = await User.getRoles(user.id);
    let roleMatch = false;
    for(let i=0; i<roles.length; i++){
        if(req.body.role === roles[i].roleType){
            roleMatch = true
        }
    }
    if(roleMatch){
        next();
    }else{
        res.status(401).json({
            message: 'The user does not have access to that role'
        })
    }
    
}

module.exports = router;