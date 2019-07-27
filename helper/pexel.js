const request = require('request');
const config = require('../config/pexelConfig.js');
// 13 call
const getImages = (callback) => {
  console.log('test');
  // change page and per_page number
  const options = {
    url: 'https://api.pexels.com/v1/search?page=&query=dining&per_page=1',
    headers: {
      Authorization: `${config.key}`,
    },
  };
  request.get(options, (error, response, body) => {
    console.log('reg');
    if (error)console.log(error)
    if (!error && response.statusCode === 200) {
      const info = JSON.parse(body);
      const images = info.photos.map( photo => photo.id);
      callback(images);
    }
  });
};

module.exports.getImages = getImages;
