const express = require('express');
const router = express.Router();
const User = require('./accountsModel');

// Params: accountId
router.get('/:id/classesAttending', validateClient, async (req, res) => {
    try {
        if(parseInt(req.token.userId) === parseInt(req.params.id)){
            const classIds = await User.getClassesById(req.params.id, false)
            let classes = [];
            for(let i=0; i<classIds.length; i++){
                let foundClass = await User.getClasses(classIds[i].classId);
                let classType = await User.getClassType(foundClass[0].classType);
                let imgUrl = await User.getImgUrl(foundClass[0].imgUrl);
                let instructor = await User.getInstructor(foundClass[0].id);
                let foundDays = await User.getDays(foundClass[0].id);
                let days = [];
                for(let k=0; k<foundDays.length; k++){
                    days.push(foundDays[k].day);
                }
                classes.push({
                    ...foundClass[0],
                    classType: classType[0].type,
                    imgUrl: imgUrl[0].url,
                    instructor: instructor[0].displayName,
                    days
                })
                
            }
            res.status(200).json(classes);
        }else{
            res.status(401).json({
                message: "You cannot access that user's information"
            })
        }  
    }
    catch(err){
        res.status(500).json(err);
    }
})

// Params: accountId
router.get('/:id/classesInstructing', validateInstructor, async (req, res) => {
    try {
        if(parseInt(req.token.userId) === parseInt(req.params.id)){
            const classIds = await User.getClassesById(req.params.id, true)
            let classes = [];
            for(let i=0; i<classIds.length; i++){
                let foundClass = await User.getClasses(classIds[i].classId);
                let classType = await User.getClassType(foundClass[0].classType);
                let imgUrl = await User.getImgUrl(foundClass[0].imgUrl);
                let instructor = await User.getInstructor(foundClass[0].id);
                let foundDays = await User.getDays(foundClass[0].id);
                let days = [];
                for(let k=0; k<foundDays.length; k++){
                    days.push(foundDays[k].day);
                }
                classes.push({
                    ...foundClass[0],
                    classType: classType[0].type,
                    imgUrl: imgUrl[0].url,
                    instructor: instructor[0].displayName,
                    days
                })
            }
            res.status(200).json(classes);
        }else{
            res.status(401).json({
                message: "You cannot access that instructor's information"
            })
        }
    }
    catch(err){
        res.status(500).json(err);
    }
})

function validateInstructor(req, res, next){
    if(req.token.role === 'instructor'){
        next();
    }else{
        res.status(401).json({
            message: 'You must be logged in as an instructor to access this data'
        })
    }
}

function validateClient(req, res, next){
    if(req.token.role === 'client'){
        next();
    }else{
        res.status(401).json({
            message: 'You must be logged in as a client to access this data'
        })
    }
}

module.exports = router;