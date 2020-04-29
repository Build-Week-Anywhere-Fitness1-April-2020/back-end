exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("classes").where('id', '>', '0').del()
      .then(function() {
        // Inserts seed entries
        return knex("classes").insert([
          {
            name: "Hot Yoga",
            time: "2020-11-7 9AM",
            duration: 1.5,
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 5,
            imgUrl: 9,
            equipmentRequired: 'Yoga Mat',
            arrivalDescription: 'Sign in at the front desk and go through the first door on the right.',
            additionalInfo: null,
            cost: 23.56,
            courseDescription: 'Intense yoga session',
            address: '706 Hart Dr. Pompton Lakes, NJ 07442',
            startDate: '01-01-2020'
          },
          {
            name: "Boxing",
            time: "2020-11-7 9AM",
            duration: 1.5,
            intensity: "expert",
            location: "New Jersey",
            maxSize: "16",
            classType: 2,
            imgUrl: 6,
            equipmentRequired: 'Boxing Gloves',
            arrivalDescription: 'Wait in the lobby for the instructor to get you.',
            additionalInfo: 'Not responsible for any injuries that may occur',
            cost: 45.00,
            courseDescription: 'Learn how to box like a pro',
            address: '90 Lexington Dr. Lakewood, NJ 08701',
            startDate: '01-05-2020'
          },
          {
            name: "Pilates",
            time: "2020-11-7 9AM",
            duration: 1.5,
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 13,
            imgUrl: 4,
            equipmentRequired: null,
            arrivalDescription: null,
            additionalInfo: null,
            cost: 9.99,
            courseDescription: 'Pilates for everyone!',
            address: '8847 Wakehurst Court Dorothy, NJ 08317',
            startDate: '02-15-2020'
          },
          {
            name: "Lifting",
            time: "2020-11-7 9AM",
            duration: 1.5,
            intensity: "beginner",
            location: "New Jersey",
            maxSize: "16",
            classType: 4,
            imgUrl: 1,
            equipmentRequired: null,
            arrivalDescription: 'Head into the weight lifting room and sign up. Wait for instructor afterwards.',
            additionalInfo: null,
            cost: 14.99,
            courseDescription: 'Get swole',
            address: '515 Harrison St. Harrisonville, NJ 08039',
            startDate: '06-01-2020'
          },
          {
            name: "Running",
            time: "2020-11-7 12AM",
            duration: 1.5,
            intensity: "expert",
            location: "New Jersey",
            maxSize: "12",
            classType: 9,
            imgUrl: 5,
            equipmentRequired: 'Running shoes, Running clothes',
            arrivalDescription: 'Wait for instructor at the front desk',
            additionalInfo: null,
            cost: 50.00,
            courseDescription: 'Improve your stamina and health!',
            address: '1 Manor Station St. Hampton, NJ 08827',
            startDate: '03-03-2020'
          },
        ]);
      });
  };