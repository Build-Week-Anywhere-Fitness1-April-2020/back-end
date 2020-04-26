const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          username: "inst1",
          email: "inst1@gmail.com",
          password: bcrypt.hashSync("test", 8),
          roleType: 1
        },
        {
          username: "inst2",
          email: "inst2@gmail.com",
          password: bcrypt.hashSync("test", 8),
          roleType: 1
        }
      ]);
    });
};