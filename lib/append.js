let renameModule = require('./rename');
let fs = require('fs');

module.exports.appendTxt = function(ogFolder, file, errors, count, filesCount){
  fs.appendFile(`${ogFolder}/${file}`, 'new data', (err) => {
    if (err) {
      errors += 1;
      if(count === filesCount){
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
      if(count === filesCount){
        console.log(`renamed ${count - errors} files, with ${errors} errors`);
      }
      return 0;
    }
    if(count === filesCount){
      console.log(`renamed ${count - errors} files, with ${errors} errors`);
    }
  })
}
