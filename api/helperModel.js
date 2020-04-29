const db = require('../data/dbConfig');

module.exports = {
    getImgOptions,
    getClassTypes
}

function getImgOptions(){
    return db('imgOptions');
}

function getClassTypes(){
    return db('classTypes');
}