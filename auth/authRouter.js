const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./authModel');

router.post('/register', (req, res) => {
    const rounds = process.env.HASH_ROUNDS || 8;
    const hash = bcrypt.hashSync(req.body.password, rounds);
    req.body.password = hash;

    /*
        Expect
        {
            username: text,
            email: text,
            password: text,
            roles: [instructor || client]
        }
        // DO NOT pass roles to the account DB
    */
   User.addAccount({
       username: req.body.username,
       email: req.body.email,
       password: req.body.password
   })
   .then(id => {
       console.log(id);
       for(let i=0; i<req.body.roles.length; i++){
            let roleId;
            if(req.body.roles[i] === 'instructor'){
                roleId = 1;
            }else{
                roleId = 2;
            };
            User.addAccountRoles({
                accountId: id[0],
                roleId: roleId
            })
            .then(() => {
                res.status(201).json({ message: 'User successfully added to database' });
            });
       };
   })
   .catch(err => {
       console.log(err);
       res.status(500).json(err);
   });
});

module.exports = router;