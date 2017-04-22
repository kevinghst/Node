let fs = require('fs');

module.exports.append = function(fileType, data, ogFolder, file){
  if(fileType === 'json'){
    let json;
    if(data.length===0){
      json = {"boo": "test"};
    } else {
      json = JSON.parse(data);
      json.boo = 'test';
    }

    fs.appendFileSync(`${ogFolder}/${file}`, {"woo": "nope"});

    // fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json));
  } else {
    fs.appendFileSync(`${ogFolder}/${file}`, "\nnew stuff");
  }
};
