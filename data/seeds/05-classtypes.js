exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('classTypes').where('id', '>', '0').del()
    .then(function() {
        // Inserts seed entries
        return knex('classTypes').insert([
          {id: 1, type: 'Aerobic'},
          {id: 2, type: 'Physical'},
          {id: 3, type: 'Running'},
          {id: 4, type: 'Lifting'},
          {id: 5, type: 'Yoga'}
        ]);
      });
  };
  