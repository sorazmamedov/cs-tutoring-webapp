//ymd = yyyy-MM-dd
//mdy = MM-dd-yyyy
// export function localToUtc(date) {
//   date = date ? date : Date.now();

//   let d = new Date(date);

//   let ymdFormat = `${d.getFullYear()}-${(d.getMonth() + 1)
//     .toString()
//     .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;

//   return ymdFormat;
// }

// export function utcToLocal(date) {
//   const format = new RegExp(
//     /^[2-9][0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
//   );
//   if (date && format.test(date)) {
//     let arr = date.split("-");
//     return `${arr[1]}-${arr[2]}-${arr[0]}`;
//   }

//   return "Invalid Date";
// }

// export function msToLocal(date) {
//   date = date ? date : Date.now();

//   let d = new Date(date);

//   let mdyFormat = `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()}`;

//   return mdyFormat;
// }