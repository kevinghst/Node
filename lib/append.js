let fs = require('fs');
let renameModule = require('./rename');

module.exports.append = function(fileType, fileName, data, ogFolder, file, count, errors, totalFiles){

  let json;
  if(data.length===0){
    json = {"boo": "test"};
  } else {
    json = JSON.parse(data);
    json.boo = 'test';
  }

  fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json), (err)=>{
    if(err){
      errors += 1;
    }

    count += 1;

    try{
      renameModule.rename(ogFolder, file, fileName, fileType);
    }
    catch(err){
      errors += 1;
      if(count === totalFiles){
        console.log(`renamed ${count - errors} files, with ${errors} errors`);
      }
      return 0;
    }

    if(count === totalFiles){
      console.log(`renamed ${count - errors} files, with ${errors} errors`);
    }
  })
};
