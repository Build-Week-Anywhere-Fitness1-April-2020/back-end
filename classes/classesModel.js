const db = require('../data/dbConfig');

module.exports = {
    getClasses,
    getById,
    addClass
}

function getClasses(){
    return db('classes');
}

function getById(id){
    return db('classes')
        .where({id});
}

function addClass(newClass){
    return db('classes')
        .insert(newClass, 'id')
        .then(id => {
            return getById(id[0]);
        })
}