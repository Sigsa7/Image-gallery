const {Client} = require('pg');

const client = new Client({
  user: 'davidbrooks',
<<<<<<< HEAD
  host: 'http://54.183.41.105/5432',
=======
  host: 'http://54.183.41.105:5432',
>>>>>>> a41822a2926974007f1e6691dceb1de3d6851d60
  database: 'resturants',
});
client.connect();

module.exports = client;
