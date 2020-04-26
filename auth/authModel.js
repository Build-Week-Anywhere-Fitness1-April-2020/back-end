const db = require('../data/dbConfig');

module.exports = {
    addAccount,
    addAccountRoles
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