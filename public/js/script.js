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