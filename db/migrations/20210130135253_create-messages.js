
exports.up = function(knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.string('text');
    table.integer('sender_id').references('users.id');
    table.integer('receiver_id').references('users.id');
    table.string('room_name');
    table.index(['room_name'])
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('messages');
};
