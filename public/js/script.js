// ajax
function schimbaContinut(resursa) {
    var xmlhttp;

    console.log("ceva");

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("continut").innerHTML = xmlhttp.responseText;
            }
        }
    }

    xmlhttp.open("GET", resursa + ".html", true);
    xmlhttp.send();
}

// functia care apeleaza clockAndDate() la fiecare secunda
function display_ClockAndDate() {
    var refresh = 1000;     // Refresh rate in milli seconds
    mytime = setTimeout('clockAndDate()', refresh);
}

// functia care afiseaza data si ora in format UTCString
function clockAndDate() {
    var date = new Date();
    var date_UTCString = date.toUTCString();
    document.getElementById("clockAndDate").innerHTML = date_UTCString;
    display_ClockAndDate();
}