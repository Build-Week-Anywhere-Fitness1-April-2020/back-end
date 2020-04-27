
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classTypes').where('id', '>', '0').del()
    .then(function () {
      // Inserts seed entries
      return knex('classTypes').insert([
        {id: 1, type: 'Running'},
        {id: 2, type: 'Lifting'},
        {id: 3, type: 'Yoga'}
      ]);
    });
};
