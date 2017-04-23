let ogFolder = './files/original';
let fs = require('fs');
let renameModule = require('./lib/rename');
let dateModule = require('./lib/date');

fs.readdir(ogFolder, (err, files) => {
  let errors = 0;
  let count = 0;

  files.forEach(file => {

    let nameArray = file.split(".");
    let fileName = nameArray[0];
    let fileType = nameArray[1];
    let currentDate = dateModule.getCurrentDate();
    let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;
    let newName = fileName + '_EDITED_' + currentDate + fileType;
    let oldPath = ogFolder + '/' + file;
    let info = `\nOriginal Name - ${file}\nOriginal Path - ${oldPath}\nNew Name - ${newName}\nNew Path - ${newPath}\n`;

    if(fileType === 'txt'){
      fs.appendFile(`${ogFolder}/${file}`, info, (err) => {
        if (err) {
          errors += 1;
        } else {
          try{
            renameModule.rename(oldPath, newPath);
          }
          catch(err){
            errors += 1;
          }
        }
        count += 1;
        if(count === files.length){
          console.log(`renamed ${count - errors} files, with ${errors} errors`);
        }
      });
    }
    else if(fileType === 'json'){
      fs.readFile(`${ogFolder}/${file}`, function(err, data){
        if (err) {
          errors += 1;
          count += 1;
          if(count === files.length){
            console.log(`renamed ${count - errors} files, with ${errors} errors`);
          }
        } else {
          let json;
          try{
            if(data.length===0){
              json = {"Original_Name": file, "Original_Path": oldPath, "New_Name": newName, "New_Path": newPath};
            } else {
              json = JSON.parse(data);
              json.Original_Name = file;
              json.Original_Path = oldPath;
              json.New_Name = newName;
              json.New_Path = newPath;
            }
          }
          catch(err){
            errors += 1;
            count += 1;
            if(count === files.length){
              console.log(`renamed ${count - errors} files, with ${errors} errors`);
            }
            return 0;
          }

          fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json), (err)=>{
            if(err) {
              errors += 1;
            } else {
              try {
                renameModule.rename(oldPath, newPath);
              }
              catch(err){
                errors += 1;
              }
            }
            count += 1;
            if(count === files.length){
              console.log(`renamed ${count - errors} files, with ${errors} errors`);
            }
          });
        }
      });
    }
  });
});
