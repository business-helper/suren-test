export function convertTime(strTime) {
    const dd = new Date(strTime);
    const year = dd.getFullYear().toString().substr(2,2);
    const month = convertToTwoDigits(dd.getMonth() + 1);
    const date = convertToTwoDigits(dd.getDate());
    const hours = convertToTwoDigits(dd.getHours());
    const minutes = convertToTwoDigits(dd.getMinutes());
    const seconds = convertToTwoDigits(dd.getSeconds());
    return `${year}.${month}.${date} ${hours}:${minutes}:${seconds}`;
}


function convertToTwoDigits(number) {
    return number > 9 ? number : "0" + number;
}
