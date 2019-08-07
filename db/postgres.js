const {Pool} = require('pg');
const client = new Pool({
  user: 'power_user',
  host: 'ec2-54-219-137-225.us-west-1.compute.amazonaws.com',
  password: 'root',
  database: 'restaurants'
});
client.connect();

module.exports = client;
