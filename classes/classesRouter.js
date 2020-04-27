const express = require('express');
const router = express.Router();
const Class = require('./classesModel');

router.get('/', (req, res) => {
    Class.getClasses()
    .then(classes => {
        res.status(201).json(classes);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    Class.getById(req.params.id)
    .then(newClass => {
        res.status(201).json(newClass);
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

/*
    Expect
    {
        name,
        dateTime,
        duration,
        intensity,
        location,
        maxSize,
        classType,
        imgUrl
    }
*/
router.post('/', validateNewClass, (req, res) => {
    Class.addClass(req.body)
    .then(newClass => {
        res.status(201).json(newClass);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

function validateNewClass(req, res, next){
    const body = req.body;
    if(body.name || body.time || body.duration || body.intensity || body.location || body.maxSize || body.classType || body.imgUrl){
        next();
    }else{
        res.status(401).json({
            message: 'Missing field'
        })
    }
}

module.exports = router;