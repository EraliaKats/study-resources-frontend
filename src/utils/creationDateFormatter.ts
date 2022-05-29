export function creationDateFormatter(fullDate: string): string {
  let date = "no date";
  let time = "no time";
  if (/\d\d\d\d-\d\d-\d\d/.test(fullDate)) {
    date = fullDate.slice(0, 10);
  }
  if (/\d\d:\d\d/.test(fullDate)) {
    time = fullDate.slice(11, 16);
  }
  return `${date} - ${time}`;
}

/*
2022-05-11T11:44:39.247Z
slice out first 10 character for the date
slice out 12-16 characters for the time
put time next to date separated by -
*/
