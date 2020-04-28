const db = require('../data/dbConfig');

module.exports = {
    getClassesById,
    getClasses,
    getClassType,
    getImgUrl,
    getByClientId,
    getByInstructorId
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

function getByClientId(id){
    return db.select('accountId').from('classAttendees').where('accountId', id);
}

function getByInstructorId(id){
    return db.select('instructorId').from('classInstructor').where('instructorId', id);
}