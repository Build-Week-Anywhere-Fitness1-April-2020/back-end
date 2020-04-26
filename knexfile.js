// Update with your config settings.
require('dotenv').config()
module.exports = {


  development: {
    client: 'pg',
    connection: {
      host:     process.env.HOST || '127.0.0.1',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DBNAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },



  staging: {
    client: 'postgresql',
    connection: {
      database: 'AF_DB',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

 
    production: {
      client: "pg",
      connection: process.env.DATABASE_URL, 
      migrations: {
        directory: "./data/migrations",
      },
      seeds: {
        directory: "./data/seeds",
      },
    },

};
