

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries

  return knex('accountRoles')
    .then(function() {
      return knex("accountRoles").insert([
          {accountId: 1, roleId: 1},
          {accountId: 2, roleId: 1},
          {accountId: 3, roleId: 2},
          {accountId: 4, roleId: 2}
      ]);
    });
};