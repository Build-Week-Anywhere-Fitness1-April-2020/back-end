
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('classDays').where('classId', '>', '0')
  .del()
    .then(function () {
      // Inserts seed entries
      return knex('classDays').insert([
        {classId: 1, dayId: 2},
        {classId: 1, dayId: 4},
        {classId: 1, dayId: 6},
        {classId: 2, dayId: 1},
        {classId: 2, dayId: 7},
        {classId: 3, dayId: 3},
        {classId: 3, dayId: 4},
        {classId: 3, dayId: 5},
        {classId: 4, dayId: 6},
        {classId: 4, dayId: 7},
        {classId: 5, dayId: 1},
        {classId: 5, dayId: 3},
        {classId: 5, dayId: 5}
      ]);
    });
};
