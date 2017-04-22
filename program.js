let ogFolder = './files/original';
let fs = require('fs');
let renameModule = require('./lib/rename');
let writeModule = require('./lib/writeJson');
let appendModule = require('./lib/append');

fs.readdir(ogFolder, (err, files) => {
  let errors = 0;
  let count = 0;

  files.forEach(file => {

    let nameArray = file.split(".");
    let fileName = nameArray[0];
    let fileType = nameArray[1];

    if(fileType === 'txt'){
      // appendModule.appendTxt(ogFolder, file, errors, count, files.length);
      fs.appendFile(`${ogFolder}/${file}`, 'new data', (err) => {
        if (err) {
          errors += 1;
          if(count === files.length){
            console.log(`renamed ${count - errors} files, with ${errors} errors`);
          }
          return 0;
        }
        count += 1;
        try{
          renameModule.rename(ogFolder, file);
        }
        catch(err){
          errors += 1;
          if(count === files.length){
            console.log(`renamed ${count - errors} files, with ${errors} errors`);
          }
          return 0;
        }
        if(count === files.length){
          console.log(`renamed ${count - errors} files, with ${errors} errors`);
        }
      })
    }
    else if(fileType === 'json'){
      fs.readFile(`${ogFolder}/${file}`, function(err, data){
        if (err) {
          errors += 1;
          if(count === files.length){
            console.log(`renamed ${count - errors} files, with ${errors} errors`);
          }
          return 0;
        }
        writeModule.writeToJson(data, ogFolder, file, count, errors, files.length);
      });
    }
  });
});
