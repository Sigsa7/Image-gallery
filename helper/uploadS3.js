const AWS = require('aws-sdk');
const request = require('request');
const config = require('../config/pexelConfig.js');
const pexel = require('./pexel.js');
const myCredentials = new AWS.CognitoIdentityCredentials({IdentityPoolId:'us-west-2:957725d9-2112-4e16-9c7a-0876448baae6'});
const awsConfig = new AWS.Config();


awsConfig.update({
  accessKeyId: `${config.accesskey}`,
  secretAccessKey: `${config.secretKey}`,
  credentials: myCredentials , 
  region: 'Regions.US_WEST_2'
});
var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
});

let key = 0;
function put_from_url(uri, callback) {
  request({
    url: uri,
    encoding: null,
  }, (err, res, body) => {
    if (err) return callback(err, res);
    s3.putObject({
      Bucket: 'sigsa7',
      Key: `${key}.jpg`,
      ContentType: res.headers['content-type'],
      Body: body,
    }, callback);
  });
  key++
}
// manually change the key value
pexel.getImages( (data) => {
  console.log(data)
  for (let i = 0; i < 1; i++) {
    console.log('pexel')
    data.forEach( (pic) => {  
      put_from_url( pic, (err, info) => {
        if (err) console.log(err);
        console.log('successful in uploading');
      });
    });
  }
});
