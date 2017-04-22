module.exports.rename = function(oldPath, newPath){
  let fs = require('fs');
  fs.renameSync(oldPath, newPath);
}
