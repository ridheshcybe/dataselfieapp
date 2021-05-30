var weekday = new Array(7),
    month = new Array(12);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";
month[0] = "january";
month[1] = "febuary";
month[2] = "march";
month[3] = "april";
month[4] = "may";
month[5] = "june";
month[6] = "july";
month[7] = "august";
month[8] = "september";
month[9] = "october";
month[10] = "november";
month[11] = "december";
let d = new Date();
let Mo = month[d.getMonth()],
    Dn = d.getDate(),
    D = weekday[d.getDay()],
    H = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds(),
    mil = d.getMilliseconds();
console.log('Month ' + Mo, H, m, s, mil)
console.log('Date ' + Dn);
console.log('Week ' + D);
console.log('Hour ' + H);
console.log('Min ' + m);
console.log('sec ' + s);
console.log('mil ' + mil);