const db = require('../data/dbConfig');

module.exports = {
    addAccount,
    addAccountRoles,
    getByUsername,
    getRoles
};

// Returns the account id for the new account
function addAccount(user){
    return db('accounts')
        .insert(user, 'id');
}

function addAccountRoles(accountRole){
    return db('accountRoles')
        .insert(accountRole);
}

function getByUsername(username){
    return db('accounts')
        .where({username})
        .first();
}

function getRoles(accountId){
    return db.select('roleType')
        .from('roles')
        .where({accountId})
        .join('accountRoles', 'roleId', 'roles.id');
}