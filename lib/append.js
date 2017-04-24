let fs = require('fs');
let dateModule = require('./date');
let renameModule = require('./rename');

module.exports.appendTxt = function(ogFolder, file, fileCount){
  let nameArray = file.split(".");
  let fileName = nameArray[0];
  let fileType = nameArray[1];
  let currentDate = dateModule.getCurrentDate();
  let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;
  let newName = fileName + '_EDITED_' + currentDate + fileType;
  let oldPath = ogFolder + '/' + file;
  let info = `\nOriginal Name - ${file}\nOriginal Path - ${oldPath}\nNew Name - ${newName}\nNew Path - ${newPath}\n`;

  fs.appendFile(`${ogFolder}/${file}`, info, (err) => {
    if (err) {
      global.errors += 1;
    } else {
      try{
        renameModule.rename(oldPath, newPath);
      }
      catch(err){
        global.errors += 1;
      }
    }
    global.count += 1;
    if(global.count === fileCount){
      console.log(`renamed ${global.count - global.errors} files, with ${global.errors} errors`);
    }
  });
}

module.exports.appendJSON = function(ogFolder, file, fileCount){
  let nameArray = file.split(".");
  let fileName = nameArray[0];
  let fileType = nameArray[1];
  let currentDate = dateModule.getCurrentDate();
  let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;
  let newName = fileName + '_EDITED_' + currentDate + fileType;
  let oldPath = ogFolder + '/' + file;

  fs.readFile(`${ogFolder}/${file}`, function(err, data){
    if (err) {
      global.errors += 1;
      global.count += 1;
      if(global.count === fileCount){
        console.log(`renamed ${global.count - errors} files, with ${global.errors} errors`);
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
        global.errors += 1;
        global.count += 1;
        if(global.count === fileCount){
          console.log(`renamed ${global.count - global.errors} files, with ${global.errors} errors`);
        }
        return 0;
      }

      fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json), (err)=>{
        if(err) {
          global.errors += 1;
        } else {
          try {
            renameModule.rename(oldPath, newPath);
          }
          catch(err){
            global.errors += 1;
          }
        }
        global.count += 1;
        if(global.count === fileCount){
          console.log(`renamed ${global.count - global.errors} files, with ${global.errors} errors`);
        }
      });
    }
  });
}
