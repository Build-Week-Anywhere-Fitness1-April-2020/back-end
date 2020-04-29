exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("classAttendees").del()
    .then(function() {
      // Inserts seed entries
      return knex("classAttendees").insert([
        { accountId: 1, classId: 1 },
        { accountId: 3, classId: 2 },
        { accountId: 3, classId: 3 },
        { accountId: 4, classId: 1}
      ]);
    });
};