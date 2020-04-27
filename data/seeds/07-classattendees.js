exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("classAttendees").del()
    .then(function() {
      // Inserts seed entries
      return knex("classAttendees").insert([
        { accountId: 1, classId: 1 },
        { accountId: 2, classId: 2 },
        { accountId: 2, classId: 3 }
      ]);
    });
};