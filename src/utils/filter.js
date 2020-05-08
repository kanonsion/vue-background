export function dateFormat(cellValue) {
  var date = new Date(cellValue.date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  month < 10 ? (month = "0" + month) : month;
  day < 10 ? (day = "0" + day) : day;
  return year + "-" + month + "-" + day;
}
