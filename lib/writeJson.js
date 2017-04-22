let fs = require('fs');
let renameModule = require('./rename');

module.exports.writeToJson = function(data, ogFolder, file, count, errors, filesCount){

  let nameArray = file.split(".");
  let fileName = nameArray[0];
  let fileType = nameArray[1];

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
};
