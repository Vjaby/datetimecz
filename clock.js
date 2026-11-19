let date_format = "{0}-{1}-{2}"
let time_format = "{0}:{1}:{2}"

let search_select;
let search_button;
let search_input;

let engines;

// https://www.geeksforgeeks.org/javascript/read-json-file-using-javascript/
async function getJson(path) {
    const response = await fetch(path);
    const res = await response.json();
    return res;
}

document.addEventListener("DOMContentLoaded", onDomLoad);
async function onDomLoad() {
    let interval_id = setInterval(update, 100);

    search_select = document.getElementById("search-select");
    search_button = document.getElementById("search-button");
    search_input = document.getElementById("search-input");

    search_button.addEventListener("click", onSearchButtonClicked);

    engines = await getJson("./engines.json")
}


async function onSearchButtonClicked() {
    let search_text = search_input.value;
    let search_engine = engines[search_select.value];
    let link = search_engine.format(search_text)
    window.location.href = link;
}


function update() {
    let d = new Date()
    let date = document.getElementById("date")
    let time = document.getElementById("time")

    time.innerHTML = time_format.formatWithPadding(d.getHours(), d.getMinutes(), d.getSeconds())
    date.innerHTML = date_format.formatWithPadding(d.getFullYear(), d.getMonth() + 1, d.getDate())
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

        return String(args[index]);
    });
};

String.prototype.formatWithPadding = function () {
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
