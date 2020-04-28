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
          password: bcrypt.hashSync("test1"),
          displayName: 'instructor1',
          gender: 'Male'
        },
        {
          id: 2,
          username: "instructor2",
          email: "inststructor2@gmail.com",
          password: bcrypt.hashSync("test2"),
          displayName: 'instructor2',
          gender: 'Male'
        },
        {
          id: 3,
          username: "client1",
          email: "client1@gmail.com",
          password: bcrypt.hashSync("test3"),
          displayName: 'client1',
          gender: 'Female'
        },
        {
          id: 4,
          username: "client2",
          email: "client2@gmail.com",
          password: bcrypt.hashSync("test4"),
          displayName: 'client2',
          gender: 'Female'
        }
      ]);
    });
};