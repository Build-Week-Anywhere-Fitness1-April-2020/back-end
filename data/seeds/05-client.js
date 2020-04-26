const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
            username: "client1",
            email: "client1@gmail.com",
            password: bcrypt.hashSync("test", 8),
            roleType: 2
        },
        {
            username: "client2",
            email: "client2@gmail.com",
            password: bcrypt.hashSync("test", 8),
            roleType: 2
        }
      ]);
    });
};