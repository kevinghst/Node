let fs = require('fs');
let dateModule = require('./date');

module.exports.rename = function(oldPath, newPath){
  fs.renameSync(oldPath, newPath);
};
