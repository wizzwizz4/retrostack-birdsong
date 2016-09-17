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
        return qobj;
    })
}
get_hot_questions.backoff = false;

function get_twitter_timeline_fragments(userid, count, maxid, fragments) {
    if (fragments === undefined) {
        fragments = [];
    }
    return get_request(
        "https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=" + userid +
        "&count=" + ((count > 200) ? 200 : count) +
        ((maxid === undefined) ? "" : ("&max_id=" + maxid))
    ).then(function(response) {
        qobj = JSON.parse(response.responseText);
        fragments.concat(qobj);
        if (fragments.length > count) {
            return fragments;
        } else {
            return get_twitter_timeline_fragments(userid, count, qobj[qobj.length - 1].id_str, fragments);
        }
    });
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
