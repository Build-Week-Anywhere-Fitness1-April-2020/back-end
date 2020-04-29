exports.seed = function(knex) {
    return knex("imgOptions").where('id', '>', '0')
      .then(function() {
        // Inserts seed entries
        return knex("imgOptions").insert([
          // Weight lifting
          {id: 1, url: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Ab Workout
          {id: 2, url: 'https://images.pexels.com/photos/416778/pexels-photo-416778.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Running on treadmill
          {id: 3, url: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'},
          // Stretching
          {id: 4, url: 'https://images.pexels.com/photos/374694/pexels-photo-374694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Running on track
          {id: 5, url: 'https://images.pexels.com/photos/936094/pexels-photo-936094.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Punching air
          {id: 6, url: 'https://images.pexels.com/photos/3562117/pexels-photo-3562117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Fitness class
          {id: 7, url: 'https://images.pexels.com/photos/866021/pexels-photo-866021.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Box Jumping
          {id: 8, url: 'https://images.pexels.com/photos/1552248/pexels-photo-1552248.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'},
          // Yoga group
          {id: 9, url: 'https://images.pexels.com/photos/1472887/pexels-photo-1472887.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
        ]);
      });
  };