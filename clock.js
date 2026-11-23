let defaultDateFormat = "{0}-{1}-{2}";
let defaultTimeFormat = "{0}:{1}:{2}";

let formats = {
    "time" : "",
    "date" : ""
};

let interval_id = 0;

let dateDiv;
let timeDiv;


document.addEventListener("DOMContentLoaded", onDomLoad);
function onDomLoad() {
    dateDiv = document.getElementById("date");
    timeDiv = document.getElementById("time");

    let dF = localStorage.getItem("dateFormat");
    dF = dF !== null ? dF : defaultDateFormat;
    setFormat("date", dF, false);

    let tF = localStorage.getItem("timeFormat");
    tF = tF !== null ? tF : defaultTimeFormat;
    setFormat("time", tF, false);

    update();
    interval_id = setInterval(update, 1000);

    // copy buttons
    let dateBtn = document.getElementById("date-button");
    dateBtn.addEventListener("click", copyToClipboard.bind(dateDiv));

    let timeBtn = document.getElementById("time-button");
    timeBtn.addEventListener("click", copyToClipboard.bind(null, timeDiv));

    // settings setup
    let settings = document.getElementById("settings");

    let showSettingsBtn = document.getElementById("show-settings-button");
    showSettingsBtn.addEventListener("click", function () {
        settings.style.display = "block";
    });

    let hideSettingsBtn = document.getElementById("hide-settings-button");
    hideSettingsBtn.addEventListener("click", function () {
        settings.style.display = "none";
    });

    // set formats
    let dateFormatBtn = document.getElementById("date-format-button");
    dateFormatBtn.addEventListener("click", function () {
        let newFormat = document.getElementById("date-format-input").value;
        setFormat("date", newFormat, true);
    });

    let timeFormatBtn = document.getElementById("time-format-button");
    timeFormatBtn.addEventListener("click", function () {
        let newFormat = document.getElementById("time-format-input").value;
        setFormat("time", newFormat, true);
    });

    // reset formats
    let dateResetBtn = document.getElementById("date-format-reset-button");
    dateResetBtn.addEventListener("click", setFormat.bind(null, "date", defaultDateFormat, true));

    let timeResetBtn = document.getElementById("time-format-reset-button");
    timeResetBtn.addEventListener("click", setFormat.bind(null, "time", defaultTimeFormat, true));

}


// name = "date" | "time"
function setFormat(name, newFormat, save) {
    if (!Object.keys(formats).includes(name)) return;

    formats[name] = newFormat;
    document.getElementById(name + "-format-input").setAttribute("placeholder", newFormat);

    if (save) localStorage.setItem(name + "Format", newFormat);
}


function update() {
    let d = new Date();

    timeDiv.innerHTML = formats["time"].formatWithPadding(
        d.getHours(), d.getMinutes(), d.getSeconds()
    );

    dateDiv.innerHTML = formats["date"].formatWithPadding(
        d.getFullYear(), d.getMonth() + 1, d.getDate()
    );
    // getMonth() -> (0 - 11)
    // get Date() -> (1 - 31)
    // why
}


function copyToClipboard(element) {
    navigator.clipboard.writeText(element.innerHTML);
}


// Source - https://stackoverflow.com/a/69718380
// Posted by Satish Chandra Gupta, modified by community. See post 'Timeline' for change history
// Modified
String.prototype.format = function () {
    let args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        if (typeof args[index] == 'undefined') {
            return match;
        }

        return String(args[index]);
    });
};

String.prototype.formatWithPadding = function () {
    let args = arguments;
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        if (typeof args[index] == 'undefined') {
            return match;
        }

        let res = String(args[index]);
        if (res.length < 2) {
            res = "0" + res;
        }

        return res;
    });
};
