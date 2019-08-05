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

//const client = redis.createClient(REDIS_PORT);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
// query by unique datev
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../public/')));
app.use('/:restaurant_id', express.static(path.join(__dirname, '/../public/')));


function cache(req, res, next) {
  const param = req.params.restaurant_id;
  client.get(param, function (err, data) {
      if (err) throw err;

      if (data != null) {
      let daga =JSON.parse(data)
          res.send(daga);
      } else {
          next();
      }
  });
}
// get all images for a restaurant,
app.get('/:restaurant_id/images',cache,(req, res) => {
  let param = req.params.restaurant_id;
  
  db.query(`SELECT * from imagesuuid where id = ${param}`, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
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
  let testdata = [344,'https://sigsa7.s3-us-west-1.amazonaws.com/351.jpg',5,6,7,false,'Et quidem dolores repellat name.','Tue Jun 04 2013 19:09:00 GMT-0700 (PDT)', '96bf3844-1e31-4cfd-8921-9ac10aa19d81']; 
  db.query(`insert into  imagesuuid  (id,imageurl,unrelated,nsfw,dislikes,isdiner,caption,date,uniqueid) values  ($1,$2,$3,$4,$5,$6,$7,$8,$9)`, testdata, (err, result) => {
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
  let uuid = req.params.uuid;

  db.query("DELETE  from  imagesuuid  where uniqueid = '701f44c3-c1e5-4078-8477-4d82b9195415'",(err, result) => {
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
  db.query("UPDATE imagesuuid set nsfw = 14 where uniqueid = '701f44c3-c1e5-4078-8477-4d82b9195415'",  (err, result) => {
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
  db.query(`UPDATE imagesuuid set ${req} where id = ${param} and uniqueid = '96bf3844-1e31-4cfd-8921-9ac10aa19d81'`,  (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).end();
    } else {
      res.status(200).send('success');
    }
  });
});
