const fs = require('fs');
const faker = require('faker');
const csvwriter = require('csv-write-stream');
const writers = csvwriter({headers: ["id", "imgUrl",'unrealated','nsfw','dontLike','isDiner','imagecaption','Date']});
const uuidv4 = require('uuid/v4');
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
// returns random entry to csv
const randomEntries = (i) => {
return `${i},https://sigsa7.s3-us-west-1.amazonaws.com/${random(0,1000)}.jpg,${random(0,14)},${random(0,12)},${random(0,13)},${randomBoolean()},${sentences[random(0,20)]},${faker.date.recent(4000)}\n` 
}
function writeOneMillionTimes(writer, data, encoding, start, end) {
  let i = start;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === end) {
        // Last time!
        for(let e = 0; e < random(8,25); e += 1) {
          writer.write(data(i), encoding);
         
        }
      } else {
        if (i % 500000 === 0 ) {
          console.log('farts', i)
        }
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        
        // 2 million are above up 25
        // 3 million are 8 to 12
        // 4 million from 0 8
        // 1 millions are 0 
        if (i %5 === 0 ) {
          for(let e = 0; e < random(12,25); e += 1) {
            ok = writer.write(data(i), encoding);
           
          }
        }
         else if (i % 8  === 0 ) {
          for(let e = 0; e < random(8,12); e += 1) {
            ok = writer.write(data(i), encoding);
            
          }
        }  else if (i % 4 === 0 ) {
          for(let e = 0; e < random(1,2); e += 1) {
            ok = writer.write(data(i), encoding);
            
          }
        }
        else {
          for(let e = 0; e < random(8,9); e += 1) {
            ok = writer.write(data(i), encoding);
          }
         }
      }
    } while (i > end && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}
writeOneMillionTimes(fs.createWriteStream('full.csv'), randomEntries, 'utf8',10000000,0);
