const express = require('express');
const router = express.Router();
const User = require('./accountsModel');

// Params: accountId
router.get('/:id/classesAttending', validateClientId, async (req, res) => {
    try {
        const classIds = await User.getClassesById(req.params.id, false)
        let classes = [];
        for(let i=0; i<classIds.length; i++){
            let foundClass = await User.getClasses(classIds[i].classId);
            let classType = await User.getClassType(foundClass[0].classType);
            let imgUrl = await User.getImgUrl(foundClass[0].imgUrl);
            classes.push({
                ...foundClass[0],
                classType: classType[0].type,
                imgUrl: imgUrl[0].url
            })
            
        }
        res.status(200).json(classes);
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Params: accountId
router.get('/:id/classesInstructing', validateInstructorId, async (req, res) => {
    try {
        const classIds = await User.getClassesById(req.params.id, true)
        let classes = [];
        for(let i=0; i<classIds.length; i++){
            let foundClass = await User.getClasses(classIds[i].classId);
            let classType = await User.getClassType(foundClass[0].classType);
            let imgUrl = await User.getImgUrl(foundClass[0].imgUrl);
            classes.push({
                ...foundClass[0],
                classType: classType[0].type,
                imgUrl: imgUrl[0].url
            })
        }
        res.status(200).json(classes);
    }
    catch(err){
        res.status(500).json(err);
    }
})

function validateClientId(req, res, next){
    User.getByClientId(req.params.id)
    .then(foundUser => {
        if(foundUser.length > 0){
            next();
        }else{
            res.status(404).json({
                message: 'The user with the given id is not attending any classes'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error finding the user in the database',
            error: err
        })
    })
}

function validateInstructorId(req, res, next){
    User.getByInstructorId(req.params.id)
    .then(foundUser => {
        if(foundUser.length > 0){
            next();
        }else{
            res.status(404).json({
                message: 'The instructor with the given id is not instructing any classes'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error finding the user in the database',
            error: err
        })
    })
}

module.exports = router;