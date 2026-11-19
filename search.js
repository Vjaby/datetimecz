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
    search_select = document.getElementById("search-select");
    search_button = document.getElementById("search-button");
    search_input = document.getElementById("search-input");

    search_button.addEventListener("click", onSearchButtonClicked);
    search_input.onkeydown = function (event) {
        if (event.key == "Enter") {
            onSearchButtonClicked();
        }
    };

    engines = await getJson("./engines.json")
}


async function onSearchButtonClicked() {
    let search_text = search_input.value;
    let search_engine = engines[search_select.value];
    let link = search_engine.format(search_text)
    window.location.href = link;
}

String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        if (typeof args[index] == 'undefined') {
            return match
        }

        return String(args[index]);
    });
}
