function get_hot_questions(pagesize, page) {
    return get_request(
        "https://api.stackexchange.com/2.2/questions?page=" + page +
        "&pagesize=" + pagesize +
        "&order=desc&sort=hot&site=retrocomputing"
    ).then(function(resolve, reject) {
        
    })
}

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
