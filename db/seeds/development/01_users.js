  
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE users RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('users').insert([
        { name: 'Athena' },
        { name: 'Minerva' },
      ]);
    });
};
