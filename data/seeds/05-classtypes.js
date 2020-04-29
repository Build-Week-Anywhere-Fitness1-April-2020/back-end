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
          {id: 5, type: 'Yoga'},
          {id: 6, type: 'HIIT'},
          {id: 7, type: 'Bootcamp'},
          {id: 8, type: 'Barre'},
          {id: 9, type: 'Conditioning'},
          {id: 10, type: 'Stretch'},
          {id: 11, type: 'Zumba'},
          {id: 12, type: 'Sport'},
          {id: 13, type: 'Pilates'}
        ]);
      });
  };
  