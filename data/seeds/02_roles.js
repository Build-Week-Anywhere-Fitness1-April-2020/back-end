exports.seed = function(knex) {
  // Deletes ALL existing entries
<<<<<<< HEAD:data/seeds/02_roles.js
  return knex('roles')
  .del()
=======
  return knex('roles').where('id', '>', '0').del()
>>>>>>> origin/dev:data/seeds/01_roles.js
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {roleType:'instructor'},
        {roleType:'client'}
      ]);
    });
};