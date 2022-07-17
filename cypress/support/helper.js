
let today = new Date().getDate();

module.exports = {
    generateCheckInRandomeDay(days) {
        return days[Math.floor(Math.random() * (days.length - today) + today)];
    },

    generateCheckOutRandomeDay(days) {
        return days[Math.floor(Math.random() * days.length)];
    }
}
