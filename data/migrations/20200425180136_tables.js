
exports.up = function(knex) {
    return knex.schema
        .createTable('accounts', table => {
            table.increments();

            table.text('username', 255)
            .notNullable()
            .unique();

            table.text('email', 255)
            .notNullable()
            .unique();

            table.text('password', 255)
            .notNullable();

            table.text('displayName')
            .notNullable();

            table.text('gender')
        })

        .createTable('roles', table => {
            table.increments();

            table.text('roleType', 255)
            .notNullable(); 
        })

        .createTable('classTypes', table =>{
            table.increments();

            table.text('type')
        })

        .createTable('imgOptions', table =>{
            table.increments();

            table.text('url');
        })

        .createTable('days', table => {
            table.increments();

            table.text('day')
            .notNullable();
        })

        .createTable('classes', table => {
            table.increments();

            table.text('name')
            .notNullable();

            table.text('time')
            .notNullable();

            table.double('duration')
            .notNullable();

            table.text('intensity')
            .notNullable();

            table.text('location')
            .notNullable();

            table.integer('maxSize')
            .notNullable();

            table.integer('classType')
            .notNullable()
            .references('classTypes.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table.integer('imgUrl')
            .notNullable()
            .references('imgOptions.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE')

            table.text('equiptmentRequired');

            table.text('arrivalDescription');

            table.text('additionalInfo');

            table.double('cost')
            .notNullable();

            table.text('description')
            .notNullable();

            table.text('address')
            .notNullable();

            table.text('startDate')
            .notNullable();
        })

        // Join tables for many to many relationships
        .createTable('classDays', table => {
            table.integer('classId')
            .notNullable()
            .references('classes.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');
            
            table.integer('dayId')
            .notNullable()
            .references('days.id')
            .onDelete('RESTRICT') 
            .onUpdate('CASCADE');
        })

        .createTable('accountRoles', table => {
            table.integer('accountId')
            .notNullable()
            .references('accounts.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table.integer('roleId')
            .notNullable()
            .references('roles.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table.primary(['accountId', 'roleId']);
        })

        .createTable('classAttendees', table => {
            table
            .integer('accountId')
            .notNullable()
            .references('accounts.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table
            .integer('classId')
            .notNullable()
            .references('classes.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table.primary(['accountId', 'classId']);
        })

        .createTable('classInstructor', table => {
            table
            .integer('instructorId')
            .notNullable()
            .references('accounts.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table
            .integer('classId')
            .notNullable()
            .references('classes.id')
            .onDelete('CASCADE') 
            .onUpdate('CASCADE');

            table.primary(['instructorId', 'classId']);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('classInstructor')
        .dropTableIfExists('classAttendees')
        .dropTableIfExists('accountRoles')
        .dropTableIfExists('classDays')
        .dropTableIfExists('classes')
        .dropTableIfExists('imgOptions')
        .dropTableIfExists('classTypes')
        .dropTableIfExists('roles')
        .dropTableIfExists('days')
        .dropTableIfExists('accounts')
};
