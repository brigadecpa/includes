let searchData = (new URL(document.location)).searchParams;
let urlParam = {}
searchData.forEach((v, k) => { urlParam[k] = v })

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach((el, k) => {
        let href = el.getAttribute('href')
        if (el.getAttribute('target')) el.removeAttribute('target')
        if (href) {
            let spreat = href.match(/\\?(.+)=/gm) ? "&" : "?"
            let searchStr = window.location.search.substring(1)
            let accessParam = {
                landingUrl: decodeURIComponent(window.location.origin + window.location.pathname),
            }
            accessParam = setSearchData(accessParam);
            let httpsParamString = encodeQueryData(accessParam)

            el.setAttribute('href', href + "&" + httpsParamString)
        }
    })
});

function setSearchData (data) {
    let accessParam = data;
    if (searchData.get("source_id")) accessParam.workspace = searchData.get("source_id")
    if (searchData.get("success_page")) accessParam.success_page = searchData.get("success_page")
    if (searchData.get("traffic_source")) accessParam.traffic_source = searchData.get("traffic_source")
    if (searchData.get("traffic_source_account")) accessParam.traffic_source_account = searchData.get("traffic_source_account")
    if (searchData.get("traffic_source_account_creative")) accessParam.traffic_source_account_creative = searchData.get("traffic_source_account_creative")
    if (searchData.get("facebook_pixel_id")) accessParam.facebook_pixel_id = searchData.get("facebook_pixel_id")
    if (searchData.get("twitter_pixel_id")) accessParam.twitter_pixel_id = searchData.get("twitter_pixel_id")
    if (searchData.get("tiktok_pixel_id")) accessParam.tiktok_pixel_id = searchData.get("tiktok_pixel_id")
    if (searchData.get("pinterest_pixel_id")) accessParam.pinterest_pixel_id = searchData.get("pinterest_pixel_id")
    if (searchData.get("quora_pixel_id")) accessParam.quora_pixel_id = searchData.get("quora_pixel_id")
    if (searchData.get("snap_chat_pixel_id")) accessParam.snap_chat_pixel_id = searchData.get("snap_chat_pixel_id")
    if (searchData.get("reddit_pixel_id")) accessParam.reddit_pixel_id = searchData.get("reddit_pixel_id")
    if (searchData.get("google_pixel_id")) accessParam.google_pixel_id = searchData.get("google_pixel_id")
    if (searchData.get("google_analytics")) accessParam.google_analytics = searchData.get("google_analytics")
    if (searchData.get("conversion_google_analytics")) accessParam.conversion_google_analytics = searchData.get("conversion_google_analytics")
    return accessParam
}

function encodeQueryData (data) {
    const ret = [];
    for (let d in data)
        ret.push(d + '=' + data[d]);
    return ret.join('&');
}
