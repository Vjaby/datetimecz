let date_format = "{0}-{1}-{2}"
let time_format = "{0}:{1}:{2}"

let interval_id = setInterval(update, 100)

function update() {
    let d = new Date()
    let date = document.getElementById("date")
    let time = document.getElementById("time")

    time.innerHTML = time_format.format(d.getHours(), d.getMinutes(), d.getSeconds())
    date.innerHTML = date_format.format(d.getFullYear(), d.getMonth()+1, d.getDate())
    // getMonth() -> (0 - 11)
    // get Date() -> (1 - 31)
    // why
}


// Source - https://stackoverflow.com/a/69718380
// Posted by Satish Chandra Gupta, modified by community. See post 'Timeline' for change history
// Modified
String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        if (typeof args[index] == 'undefined') {
            return match
        }

        let res = String(args[index])
        if (res.length < 2) {
            res = "0" + res;
        }

        return res;
    });
};
