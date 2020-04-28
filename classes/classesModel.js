const db = require('../data/dbConfig');

module.exports = {
    getClasses,
    getById,
    addClass,
    addClassInstructor,
    getDayId,
    addClassDay,
    removeClass,
    updateClass,
    getAccountIds,
    getAccountById,
    getClassInstructor,
    getImgUrl,
    getClassType
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
}

function addClassInstructor(instructorId, classId){
    return db('classInstructor')
        .insert({
            instructorId,
            classId
        })
}

function getDayId(day){
    return db.select('id')
        .from('days')
        .where({ day })
        .first();
}

function addClassDay(classId, dayId){
    return db('classDays')
        .insert({
            classId,
            dayId
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

function getClassInstructor(classId){
    return db.select('a.displayName')
        .from('classInstructor as ci')
        .where({classId})
        .join('accounts as a', 'ci.instructorId', 'a.id')
}

function getImgUrl(classImg){
    return db.select('url')
        .from('imgOptions')
        .where('id', classImg);
}

function getClassType(classType){
    return db.select('type')
        .from('classTypes')
        .where('id', classType)
}
