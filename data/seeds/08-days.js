
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('days').del()
    .then(function () {
      // Inserts seed entries
      return knex('days').insert([
        {id: 1, day: 'Sunday'},
        {id: 2, day: 'Monday'},
        {id: 3, day: 'Tuesday'},
        {id: 4, day: 'Wednesday'},
        {id: 5, day: 'Thursday'},
        {id: 6, day: 'Friday'},
        {id: 7, day: 'Satruday'},
      ]);
    });
};
