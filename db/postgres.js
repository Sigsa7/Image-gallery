const {Client} = require('pg');

const client = new Client({
  user: 'davidbrooks',
  host: 'http://54.183.41.105:5432',
  database: 'resturants',
});
client.connect();

module.exports = client;
