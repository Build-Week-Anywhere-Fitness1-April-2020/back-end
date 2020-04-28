const db = require('../data/dbConfig');

module.exports = {
    getClasses,
    getById,
    addClass,
    removeClass,
    updateClass,
    getAccountIds,
    getAccountById
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

function removeClass(id){
    return db('classes')
    .where({id})
    .del();
}

function updateClass(changes, id){
    return db('classes')
    .where({id})
    .update(changes);
}

function getAccountIds(classId){
    return db.select('accountId').from('classAttendees').where({classId});
}

function getAccountById(id){
    return db('accounts').where({id});
}