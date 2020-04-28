const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts").del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          username: "instructor1",
          email: "instructor1@gmail.com",
          password: bcrypt.hashSync("test1"),
          displayName: 'instructor1',
          gender: 'Male'
        },
        {
          username: "instructor2",
          email: "inststructor2@gmail.com",
          password: bcrypt.hashSync("test2"),
          displayName: 'instructor2',
          gender: 'Male'
        },
        {
          username: "client1",
          email: "client1@gmail.com",
          password: bcrypt.hashSync("test3"),
          displayName: 'client1',
          gender: 'Female'
        },
        {
          username: "client2",
          email: "client2@gmail.com",
          password: bcrypt.hashSync("test4"),
          displayName: 'client2',
          gender: 'Female'
        }
      ]);
    });
};