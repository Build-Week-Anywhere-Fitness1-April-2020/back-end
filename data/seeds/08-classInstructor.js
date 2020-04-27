exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("classInstructor")
      .then(function() {
        // Inserts seed entries
        return knex("classInstructor").insert([
          { instructorId: 1, classId: 1 },
          { instructorId: 2, classId: 2 },
          { instructorId: 2, classId: 3 },
          { instructorId: 1, classId: 4 },
          { instructorId: 1, classId: 5 }
          
        ]);
      });
  };