// Update with your config settings.
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/chat_app_be',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL + `?ssl=true`,
    ssl: { rejectUnauthorized: false },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/development'
    },
    useNullAsDefault: true
  }
}
