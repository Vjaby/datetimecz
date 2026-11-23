let defaultDateFormat = "{0}-{1}-{2}";
let defaultTimeFormat = "{0}:{1}:{2}";

let dateFormat = "";
let timeFormat = "";

let interval_id = 0;

let dateDiv;
let timeDiv;


document.addEventListener("DOMContentLoaded", onDomLoad);
function onDomLoad() {
    dateDiv = document.getElementById("date");
    timeDiv = document.getElementById("time");

    let dF = localStorage.getItem("dateFormat");
    dateFormat = dF !== null ? dF : defaultDateFormat;
    document.getElementById("date-format-input").setAttribute("placeholder", dateFormat);

    let tF = localStorage.getItem("timeFormat");
    timeFormat = tF !== null ? tF : defaultTimeFormat;
    document.getElementById("time-format-input").setAttribute("placeholder", timeFormat);

    update();
    interval_id = setInterval(update, 1000);

    let dateBtn = document.getElementById("date-button");
    dateBtn.addEventListener("click", function () {
        copyToClipboard(dateDiv);
    });

    let timeBtn = document.getElementById("time-button");
    timeBtn.addEventListener("click", function () {
        copyToClipboard(timeDiv);
    });

    let settings = document.getElementById("settings");

    let showSettingsBtn = document.getElementById("show-settings-button");
    showSettingsBtn.addEventListener("click", function () {
        settings.style.display = "block";
    });

    let hideSettingsBtn = document.getElementById("hide-settings-button");
    hideSettingsBtn.addEventListener("click", function () {
        settings.style.display = "none";
    });

    let dateFormatBtn = document.getElementById("date-format-button");
    dateFormatBtn.addEventListener("click", function () {
        let newFormat = document.getElementById("date-format-input").value;
        dateFormat = newFormat;
        localStorage.setItem("dateFormat", newFormat);
        document.getElementById("date-format-input").setAttribute("placeholder", dateFormat);
    });

    let timeFormatBtn = document.getElementById("time-format-button");
    timeFormatBtn.addEventListener("click", function () {
        let newFormat = document.getElementById("time-format-input").value;
        timeFormat = newFormat;
        localStorage.setItem("timeFormat", newFormat);
        document.getElementById("time-format-input").setAttribute("placeholder", timeFormat);
    });
}


function update() {
    let d = new Date();

    timeDiv.innerHTML = timeFormat.formatWithPadding(
        d.getHours(), d.getMinutes(), d.getSeconds()
    );

    dateDiv.innerHTML = dateFormat.formatWithPadding(
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
