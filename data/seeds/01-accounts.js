const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts").del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          id: 1,
          username: "instructor1",
          email: "instructor1@gmail.com",
          password: bcrypt.hashSync("test1")
        },
        {
          id: 2,
          username: "insttuctor2",
          email: "inststructor2@gmail.com",
          password: bcrypt.hashSync("test2")
        },
        {
          id: 3,
          username: "client1",
          email: "client1@gmail.com",
          password: bcrypt.hashSync("test3")
        },
        {
          id: 4,
          username: "client2",
          email: "client2@gmail.com",
          password: bcrypt.hashSync("test4")
        }
      ]);
    });
};