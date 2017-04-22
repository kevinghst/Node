const ogFolder = './files/original';
const fs = require('fs');

fs.readdir(ogFolder, (err, files) => {
  let errors = 0;
  let count = 0;

  files.forEach(file => {
    //file equivalent to file name

    let nameArray = file.split(".");
    let fileName = nameArray[0];
    let fileType = nameArray[1];
    count += 1;

    fs.readFile(`${ogFolder}/${file}`, function(err, data){
      if (err) {
        errors += 1;
        if(count === files.length){
          console.log(`renamed ${count - errors} files, with ${errors} errors`);
        }
        return 0;
      }

      try{
        if(fileType === 'json'){
          let json;
          // if(data.length===0){
          //   json = {"boo": "test"};
          // } else {
          //   json = JSON.parse(data);
          //   json.boo = 'test';
          // }
          json = JSON.parse(data);
          json.boo = 'test';

          fs.writeFile(`${ogFolder}/${file}`, JSON.stringify(json));
        } else {
          let appended = data + "\nnew stuff";
          fs.writeFile(`${ogFolder}/${file}`, appended);
        }
        let oldPath = ogFolder + '/' + file;
        let currentDate = getCurrentDate();
        let newPath = './files/moved/' + fileName + '_EDITED_' + currentDate + fileType;

        fs.rename(oldPath, newPath, function (err) {
          if (err) {
            throw err;
          }
        });
      }
      catch(err){
        errors += 1;
        if(count === files.length){
          console.log(`renamed ${count - errors} files, with ${errors} errors`);
        }
        return 0;
      }
    });

  });
});

function getCurrentDate(){
  let date = new Date();
  let year = date.getFullYear().toString();
  let month = date.getMonth().toString();
  if(month.length === 1){
    month = '0' + month;
  }
  let day = date.getDate().toString();
  if(day.length === 1){
    day = '0' + day;
  }
  let hour = date.getHours().toString();
  if(hour.length === 1){
    hour = '0' + hour;
  }
  let minute = date.getMinutes().toString();
  if(minute.length === 1){
    minute = '0' + minute;
  }
  return `${year}-${month}-${day}_${hour}-${minute}.`;
}
