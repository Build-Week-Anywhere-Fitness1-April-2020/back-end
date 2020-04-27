exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("classes").where('id', '>', '0').del()
      .then(function() {
        // Inserts seed entries
        return knex("classes").insert([
          {
            id: 1,
            name: "Hot Yoga",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 5,
            imgUrl:1
          },
          {
            id: 2,
            name: "Boxing",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 2,
            imgUrl:2
          },
          {
            id: 3,
            name: "Pilates",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 1,
            imgUrl:3
          },
          {
            id: 4,
            name: "Lifting",
            dateTime: "2020-11-7 9AM",
            duration: "30 min",
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 4,
            imgUrl:1
          },
          {
            id: 5,
            name: "Running",
            dateTime: "2020-11-7 12AM",
            duration: "60 min",
            intensity: "expert",
            location: "New Jersey",
            maxSize: "12",
            classType: 3,
            imgUrl:3
          },
        ]);
      });
  };