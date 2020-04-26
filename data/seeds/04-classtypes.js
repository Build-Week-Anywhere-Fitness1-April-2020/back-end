exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('classTypes') 
    .del()
    .then(function() {
        // Inserts seed entries
        return knex('classTypes').insert([
          {id: 1, type: 'Aerobic'},
          {id: 2, type: 'Physical'}
        ]);
      });
  };
  