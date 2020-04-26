const db = require('../data/dbConfig');

module.exports = {
    addAccount,
    addAccountRoles,
    getByUsername
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