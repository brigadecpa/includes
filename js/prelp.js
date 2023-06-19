let trackDomain = 'luckytrack.click';

function getQueryParamValue(paramName) {
    var urlParams = new URLSearchParams(window.location.search);
    var paramValue = urlParams.get(paramName);

    return paramValue;
}

if (getQueryParamValue('d') && getQueryParamValue('d') !== '{d}') {
    trackDomain = getQueryParamValue('d');
}

for (const a of document.querySelectorAll('a')) {
    a.setAttribute('href', '//' + trackDomain + '/?_lp=1&' + window.location.search.substring(1));
}
