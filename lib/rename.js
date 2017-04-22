let fs = require('fs');
let dateModule = require('./date');

module.exports.rename = function(ogFolder, file, fileName, fileType){
  let currentDate = dateModule.getCurrentDate();
  let oldPath = ogFolder + '/' + file;
  let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;
  fs.renameSync(oldPath, newPath);
}
