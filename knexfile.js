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
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  test: {
    client: 'pg',
    connection: {
      host:     process.env.HOST || '127.0.0.1',
      user:     process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.TEST_DB
    },
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: `${process.env.DATABASE_URL}`,
    migrations: {
      directory: './data/migrations'
    },
    seeds: {
      directory: './data/seeds'
    }
  }
};
