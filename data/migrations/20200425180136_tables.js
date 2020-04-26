
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
        .createTable('classes', table => {
            table.increments();

            table.text('name')
            .notNullable();

            table.text('dateTime')
            .notNullable();

            table.text('duration')
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
            .onDelete('RESTRICT') 
            .onUpdate('RESTRICT');

            table.integer('imgUrl')
            .notNullable()
            .references('imgOptions.id')
            .onDelete('RESTRICT') 
            .onUpdate('RESTRICT');
        })
        .createTable('accountRoles', table => {
            table
            .integer('accountId')
            .notNullable()
            .references('accounts.id')
            .onDelete('RESTRICT') 
            .onUpdate('CASCADE');

            table
            .integer('roleId')
            .notNullable()
            .references("id")
            .inTable("roles")
            .onDelete('RESTRICT') 
            .onUpdate('CASCADE');

            table.primary(['accountId', 'roleId']);
        })
        .createTable('classAttendees', table => {
            table
            .integer('accountId')
            .notNullable()
            .references('accounts.id')
            .onDelete('RESTRICT') 
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
            .onDelete('RESTRICT') 
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
        .dropTableIfExists('classes')
        .dropTableIfExists('imgOptions')
        .dropTableIfExists('classTypes')
        .dropTableIfExists('roles')
        .dropTableIfExists('accounts')
};
