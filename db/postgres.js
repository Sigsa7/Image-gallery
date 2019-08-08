const {Pool} = require('pg');
const pool = new Pool({
  user: 'power_user',
  host: 'ec2-54-219-137-225.us-west-1.compute.amazonaws.com',
  password: 'root',
  database: 'restaurants',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})
// callback - checkout a client
module.exports = pool;
