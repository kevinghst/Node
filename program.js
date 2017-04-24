let ogFolder = './files/original';
let fs = require('fs');
let appendModule = require('./lib/append');

fs.readdir(ogFolder, (err, files) => {
  global.errors = 0;
  global.count = 0;

  files.forEach(file => {

    let nameArray = file.split(".");
    let fileName = nameArray[0];
    let fileType = nameArray[1];

    if(fileType === 'txt'){
      appendModule.appendTxt(ogFolder, file, files.length);
    }
    else if(fileType === 'json'){
      appendModule.appendJSON(ogFolder, file, files.length);
    } else {
      global.errors += 1;
      global.count += 1;
      if(global.count === files.length){
        console.log(`renamed ${global.count - global.errors} files, with ${global.errors} errors`);
      }
    }
  });
});
