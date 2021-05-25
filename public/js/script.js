function schimbaContinut(resursa, jsFisier, jsFunctie) {
    console.log("am intrat aici");

    var xmlhttp;

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                document.getElementById("continut").innerHTML = xmlhttp.responseText;
                
                if (jsFisier) {
                    var elementScript = document.createElement('script');
                    elementScript.onload = function () {
                        console.log("hello");
                        if (jsFunctie) {
                            window[jsFunctie]();
                        }
                    };
                    elementScript.src = jsFisier;
                    document.head.appendChild(elementScript);
                } else {
                    if (jsFunctie) {
                        window[jsFunctie]();
                    }
                }
            }
        }
    }

    console.log(xmlhttp.responseText);

    xmlhttp.open("GET", resursa + ".html", true);
    xmlhttp.send();
}