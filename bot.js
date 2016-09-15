function get_hot_questions(quantity) {
    return new Promise(function(resolve, reject) {
        
    });
}

function get_request(url, responsetype) {
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener("error", reject);
        xmlhttp.addEventListener("abort", reject);
        xmlhttp.addEventListener("load", resolve);
        xmlhttp.open(url, "GET");
        xmlhttp.responseType = responsetype;
        xmlhttp.send();
    });
}
