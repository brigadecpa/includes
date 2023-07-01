(function(window, location) {
    let d = 'luckytrack.click';
    let source_id = '';
    let traffic_source = '{traffic_source}';
    let success_page = '{success_page}';
    let subid = '';

    function getQueryParamValue(paramName) {
        var urlParams = new URLSearchParams(window.location.search);
        var paramValue = urlParams.get(paramName);

        return paramValue;
    }

    function getCookie(name) {
        var cookieName = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var cookieArray = decodedCookie.split(';');

        for (var i = 0; i < cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }

        return "";
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    if (getQueryParamValue('d') && getQueryParamValue('d') !== '{d}') {
        d = getQueryParamValue('d');
    }

    if (getQueryParamValue('subid') && getQueryParamValue('subid') !== '{subid}') {
        subid = getQueryParamValue('subid');
    }

    if (getQueryParamValue('s2') && getQueryParamValue('s2') !== '{s2}') {
        subid = getQueryParamValue('s2');
    }

    if (getQueryParamValue('source_id') && getQueryParamValue('source_id') !== '{source_id}') {
        source_id = getQueryParamValue('source_id');
    }

    if (getQueryParamValue('traffic_source') && getQueryParamValue('traffic_source') !== '{traffic_source}') {
        traffic_source = getQueryParamValue('traffic_source');
    }

    if (getQueryParamValue('success_page') && getQueryParamValue('success_page') !== '{success_page}') {
        success_page = getQueryParamValue('success_page');
    }

    // var bbURL = '//' + trackDomain + '/V9nJzT?_lp=1&' + window.location.search.substring(1);
    var bbURL = 'https://' + d + '/V9nJzT?source_id=' + source_id + '&subid=' + subid + '&traffic_source=' + traffic_source + '&success_page=' + success_page;
    history.pushState(null, document.title, location);

    if (getQueryParamValue('backfix')) {
        window.addEventListener("popstate", function() {
            // if (!getCookie('backfix-used')) {
            // setCookie('backfix-used', 1, 1)
            history.replaceState(null, document.title, location);
            setTimeout(function() {
                location.replace(bbURL);
            }, 0);
            // }
        }, false);
    }
}(window, location));
