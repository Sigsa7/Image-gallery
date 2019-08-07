require('newrelic');

const express = require('express');
//const morgan = require('morgan');
const db = require('../db/postgres.js');
const path = require('path');
const app = express();
const port = 3001;
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT;
const client = redis.createClient(REDIS_PORT);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// query by unique datev
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));

function cache(req, res, next) {
  const param = req.params.restaurant_id;
  client.get(param, (err, data) => {
    if (err) throw err;
    if (data != null) {
      let daga =JSON.parse(data);
      res.send(daga);
    } else {
      next();
    }
  });
}
// get all images for a restaurant,
app.get('/:restaurant_id/images', cache, (req, res) => {
  let param = req.params.restaurant_id;
  db.query(`SELECT * from serialImages where restaurantId = ${param}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      console.log('ee')
      client.set(req.params.restaurant_id, JSON.stringify(result.rows));
      res.status(200).send(result.rows);
    }
  });
});

// add a image
app.post('/:restaurant_id/images', (req, res) => {
  let param = req.params.restaurant_id;
  // this should replaced after testing speed
  let data = [req.body];
  let testdata = [344,'https://sigsa7.s3-us-west-1.amazonaws.com/351.jpg',5,6,7,false,'Et quidem dolores repellat name.','Tue Jun 04 2013 19:09:00 GMT-0700 (PDT)']; 
  db.query(`insert into  serialImages (restaurantId,imageUrl,unrelated,nsfw,dislikes,isDiner,caption,date) values  ($1,$2,$3,$4,$5,$6,$7,$8)`, testdata, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    }else {
      res.status(200).send('success');
    }
  });
});

app.delete('/:restaurant_id/images', (req, res) => {
  let param = req.params.restaurant_id;
  db.query(`DELETE  from  serialImages  where restaurantId = ${param}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.put('/:restaurant_id/images', (req, res) => {
  let param = req.params.restaurant_id;

  // add this to request after testing
  let data = req.body.column;
  db.query(`UPDATE serialImages set nsfw = 14 where restaurantId = ${param}`,  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send(result);
    }
  });
});

app.patch('/:restaurant_id/images', (req, res) => {
  let param = req.params.restaurant_id;
  let body = req.body.column;
  let uuid = req.body.uuid;
  let data = [req.body.data];

  // function the returns a string where column = data
  db.query(`UPDATE serialImages set ${req} where restaurantId = ${param} `,  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send('success');
    }
  });
});
