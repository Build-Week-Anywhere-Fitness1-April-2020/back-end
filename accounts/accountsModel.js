const db = require('../data/dbConfig');

module.exports = {
    getClassesById,
    getClasses,
    getClassType,
    getImgUrl,
    getInstructor,
    getDays
}

function getClassesById(id, isInstructor){
    let table;
    let column;
    if(isInstructor){
        table = 'classInstructor';
        column = 'instructorId';
    }else{
        table = 'classAttendees'
        column = 'accountId';
    }
    return db.select('classId').from(table).where(column, id);
}

function getClasses(id){
    return db('classes').where({id});
}

function getClassType(classTypeId){
    return db.select('type').from('classTypes').where('id', classTypeId);
}

function getImgUrl(imgId){
    return db.select('url').from('imgOptions').where('id', imgId);
}

function getInstructor(classId){
    return db.select('displayName')
        .from('accounts')
        .where({classId})
        .join('classInstructor', 'instructorId', 'accounts.id');
}

function getDays(classId){
    return db.select('day')
        .from('days')
        .where({ classId })
        .join('classDays', 'dayId', 'days.id');
}