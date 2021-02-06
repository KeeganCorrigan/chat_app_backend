const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class User {
  static find(name) {
    return database('users').where('name', name).select()
  }

  static create(user) {
    return database('users').insert(user).returning("*")
  }
}
