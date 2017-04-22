module.exports.getCurrentDate = function(){
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
