const Image = require('./image.js');
const db = require('./index.js');

function create() {
  const arr = [];

  // 240 as the limit because there are 239 photos in S3
  for (let i = 0; i < 100; i++) {
    let count = 0;

    while (count<15) {
      let randomInt = Math.floor(Math.random() * Math.floor(239));
      arr.push({
        restaurant_id: `${i}`,
        image_url: `https://reservly-photos.s3-us-west-1.amazonaws.com/${randomInt}.jpg`,
      });
      count++;
    }
  }

  // for (let i = 0; i < 240; i++) {
  //   const randomInt = Math.floor(Math.random() * Math.floor(101));
  //   arr.push({
  //     restaurant_id: randomInt,
  //     image_url: `https://reservly-photos.s3-us-west-1.amazonaws.com/${i}.jpg`,
  //   });
  // }

  return arr;
}

const sampleurls = create();

const insertImages = () => {
  Image.insertMany(sampleurls)
    .then(() => {
      console.log('successfully loaded');
      db.close();
    })
    .catch(() => {
      console.log('error');
      db.close();
    });
};

insertImages();
