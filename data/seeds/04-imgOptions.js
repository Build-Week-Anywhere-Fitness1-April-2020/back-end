exports.seed = function(knex) {
    return knex("imgOptions").where('id', '>', '0')
      .then(function() {
        // Inserts seed entries
        return knex("imgOptions").insert([
          {id: 1, url: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          {id: 2, url: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          {id: 3, url: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
        ]);
      });
  };