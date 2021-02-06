const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class Message {
  static create(message) {
    return database('messages').insert(message).returning("*");
  }

  static getByRoomName(room_name, limit) {
    return database.raw
      (`
        SELECT messages.id, messages.text,
          s.name AS sender_name
          FROM messages
          JOIN users s ON s.id = messages.sender_id
          WHERE messages.room_name = '${room_name}'
          ORDER BY messages.id
          LIMIT ${limit || 100}
      `)
  }
}
