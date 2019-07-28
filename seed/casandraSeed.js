const fs = require('fs');
const faker = require('faker');
const csvwriter = require('csv-write-stream');
const writer = csvwriter({headers: ["id", "imgUrl",'unrealated','innapropriate','dontLike','isDiner','imagecaption','Date']});

const sentences = [];

// creates a list of random sentences for the description field
for (let k = 0; k < 20; k += 1) {
  sentences.push(faker.lorem.sentence());
}
// returns random boolean for diner field
let randomBoolean = () => {
  if (Math.floor(Math.random() * Math.floor(2)) > 0) {
    return true;
  } return false;
};
// random min max
let random = (low, high) => {
  min = Math.ceil(low);
  max = Math.floor(high);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// uniqe id counter variable 
let count = 0;

// returns random entry to csv
const randomEntries = (i) => {
return `${i},https://sigsa7.s3-us-west-1.amazonaws.com/${random(0,1000)}.jpg,${random(0,14)},${random(0,12)},${random(0,13)},${randomBoolean()},${sentences[random(0,19)]},${faker.date.recent(4000)}\n` 
}
function writeOneMillionTimes(writer, data, encoding) {
  let i = 1000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Last time!
        for(let e = 0; e < random(8,25); e += 1) {
          writer.write(data(i), encoding);
          count += 1;
        }
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        for(let e = 0; e < random(8,25); e += 1) {
          ok = writer.write(data(i), encoding);
          count += 1;
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeOneMillionTimes(fs.createWriteStream('tinyboi.csv'), randomEntries, 'utf8');
