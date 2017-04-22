
const ogFolder = './files/original';
const fs = require('fs');



fs.readdir(ogFolder, (err, files) => {
  files.forEach(file => {
    //file equivalent to file name

    let nameArray = file.split(".");
    let fileName = nameArray[0];
    let fileType = nameArray[1];

    if(fileType === 'txt'){
      fs.appendFile(`${ogFolder}/${file}`, 'data to append', function (err) {
        if (err) throw err;

        let oldPath = ogFolder + '/' + file;
        let newPath = './files/moved/' + fileName + '_edited.' + fileType;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      });
    }
    else if(fileType === 'json'){
      fs.readFile(`${ogFolder}/${file}`, function(err, data){
        var json = JSON.parse(data);
        json.name = 'test';
        fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json));

        let oldPath = ogFolder + '/' + file;
        let newPath = './files/moved/' + fileName + '_edited.' + fileType;

        fs.rename(oldPath, newPath, function (err) {
          if (err) throw err;
        });
      });
    }
  });
})
