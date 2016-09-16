function get_hot_questions(pagesize, page) {
    if (get_hot_questions.backoff) {
        throw "backoff";
    }
    return get_request(
        "https://api.stackexchange.com/2.2/questions?page=" + page +
        "&pagesize=" + pagesize +
        "&order=desc&sort=hot&site=retrocomputing"
    ).then(function(response) {
        qobj = JSON.parse(response.responseText);
        if (qobj.hasOwnProperty("backoff")) {
            get_hot_questions.backoff = true;
            setTimeout(function(){
                get_hot_questions.backoff = true;
            }, qobj.backoff * 1000)
        }
        return qobj; //Do some more pre-processing first!
    })
}
get_hot_questions.backoff = false;

function get_request(url, responsetype) {
    return new Promise(function(resolve, reject) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.addEventListener("error", reject);
        xmlhttp.addEventListener("abort", reject);
        xmlhttp.addEventListener("load", resolve);
        xmlhttp.open(url, "GET");
        if (bool !== undefined) {
            xmlhttp.responseType = responsetype;
        }
        xmlhttp.send();
    });
}
