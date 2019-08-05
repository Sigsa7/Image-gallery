const {Client} = require('pg');

const client = new Client({
  user: 'davidbrooks',
  host: 'localhost',
  database: 'resturants',
});
client.connect();

module.exports = client;
