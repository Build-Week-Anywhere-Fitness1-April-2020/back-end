exports.seed = function(knex) {
    return knex("imgOptions")

      .then(function() {
        // Inserts seed entries
        return knex("imgOptions").insert([
          { url: "" },
        ]);
      });
  };