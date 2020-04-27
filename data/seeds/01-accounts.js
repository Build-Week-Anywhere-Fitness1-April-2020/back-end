const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          username: "instructor1",
          email: "instructor1@gmail.com",
          password: bcrypt.hashSync("test1"),
        },
        {
      
          username: "insttuctor2",
          email: "inststructor2@gmail.com",
          password: bcrypt.hashSync("test2"),
        },
        {
     
            username: "client1",
            email: "client1@gmail.com",
            password: bcrypt.hashSync("test3"),
        },
        {
       
            username: "client2",
            email: "client2@gmail.com",
            password: bcrypt.hashSync("test4"),
        }
      ]);
    });
};