/**
 * Parse date in seconds
 * @param {Number} seconds
 * @return {string} - date in string format
 */
export default function(seconds) {
    const date = new Date(seconds * 1000);
    const dateNow = new Date();
    const parsedDate = {
        day: (date.getDate() > 9) ? date.getDate() : '0' + date.getDate(),
        month: (date.getMonth() > 9) ? date.getMonth() : '0' + date.getMonth(),
        year: date.getFullYear(),
        hours: (date.getHours() > 9) ? date.getHours() : '0' + date.getHours(),
        minutes: (date.getMinutes() > 9) ? date.getMinutes() : '0' + date.getMinutes(),
        seconds: (date.getSeconds() > 9) ? date.getSeconds() : '0' + date.getSeconds(),
    };
    let dateString;
    if (dateNow.getDate() === date.getDate() &&
        dateNow.getMonth() === date.getMonth() &&
        dateNow.getFullYear() === date.getFullYear()) {
        dateString = 'Сегодня в ';
    } else {
        dateString = `${parsedDate.day}.${parsedDate.month}.${parsedDate.year}`;
    }
    dateString += ` ${parsedDate.hours}:${parsedDate.minutes}`;
    return dateString;
}
