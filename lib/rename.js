let fs = require('fs');
let dateModule = require('./date');

module.exports.rename = function(ogFolder, file){
  let nameArray = file.split(".");
  let fileName = nameArray[0];
  let fileType = nameArray[1];

  let currentDate = dateModule.getCurrentDate();
  let oldPath = ogFolder + '/' + file;
  let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;
  fs.renameSync(oldPath, newPath);
}
