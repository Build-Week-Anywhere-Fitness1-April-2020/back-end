const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts").del()
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        // Instructor & Client
        {
          username: 'mark123',
          email: 'mark@gmail.com',
          password: bcrypt.hashSync('mark123'),
          displayName: 'Mark',
          gender: 'Male'
        },
        // Instructor
        {
          username: 'samantha123',
          email: 'samantha@gmail.com',
          password: bcrypt.hashSync('samanthan123'),
          displayName: 'Samantha',
          gender: 'Female'
        },
        // Client
        {
          username: 'bob123',
          email: 'bob@gmail.com',
          password: bcrypt.hashSync('bob123'),
          displayName: 'bob123',
          gender: 'Female'
        },
        // Client
        {
          username: 'riley123',
          email: "riley@gmail.com",
          password: bcrypt.hashSync("riley123"),
          displayName: 'Riley',
          gender: 'Female'
        }
      ]);
    });
};