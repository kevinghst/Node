let fs = require('fs');
let renameModule = require('./lib/rename');


let result = fs.appendFile(`./files/original/what.txt`, 'new data', (err) => {
  let outcome;
  if (err) {
    outcome = false;
  } else {
    try{
      renameModule.rename(ogFolder, file);
    }
    catch(err){
      outcome = false;
    }
    if(outcome !== false){
      outcome = true;
    }
  }
  return outcome;
});

console.log(result);
