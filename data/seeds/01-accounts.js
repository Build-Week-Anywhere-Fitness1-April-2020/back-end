const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("accounts")
    .then(function() {
      // Inserts seed entries
      return knex("accounts").insert([
        {
          username: "instructor1",
          email: "instructor@gmail.com",
          password: bcrypt.hashSync("test1"),
        },
        {
      
          username: "inst2",
          email: "inst2@gmail.com",
          password: bcrypt.hashSync("test2"),
        },
        {
     
            username: "client1",
            email: "client1@gmail.com",
            password: bcrypt.hashSync("test3"),
        },
        {
       
            username: "cli2",
            email: "client2@gmail.com",
            password: bcrypt.hashSync("test4"),
        }
      ]);
    });
};