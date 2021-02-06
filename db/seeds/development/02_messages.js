exports.seed = function(knex, Promise) {
  knex.raw('TRUNCATE messages RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('messages').insert([
        { sender_id: 1, receiver_id: 2, text: 'hey, there!', room_name: "ArtemisMinerva" },
        { sender_id: 2, receiver_id: 1, text: 'right back atcha tiger.', room_name: "ArtemisMinerva" },
        { sender_id: 1, receiver_id: 2, text: 'did you catch that sportball game', room_name: "ArtemisMinerva" },
        { sender_id: 2, receiver_id: 1, text: 'yeah, it was outrageous', room_name: "ArtemisMinerva" },
        { sender_id: 1, receiver_id: 2, text: 'OUTRAGEOUS', room_name: "ArtemisMinerva" },
      ]);
  })
}
