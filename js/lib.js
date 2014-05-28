/**
 * Parses current query string as set of parameters
 * @param str
 * @returns Object
 */
var paramsFromQueryString = function(str) {
    var searchString = str,
        searchStringArray,
        searchStringParams = {};
    if (!str || typeof str === "undefined")
        searchString = location.search;
    searchString = searchString.substr(1);
    if (searchString=="") throw new Error("query string is empty");
    searchStringArray = searchString.split("&");
    for (var i in searchStringArray) {
        var ar = searchStringArray[i].split("=");
        searchStringParams[ar[0]] = ar[1];
    }
    return searchStringParams;
};

/**
 * Serialize passed object to query string with adding to given URL
 * @param params
 * @param url
 */
var paramsToQueryString = function(params, url) {
    var queryString = "";
    for (var key in params) {
        if (params.hasOwnProperty(key)) queryString += "&"+ key +"="+ params[key];
    }
    queryString = "?"+queryString.substr(1);
    if (typeof url != "undefined" && url != "")
        return (url.slice(-1)=="/") ? url+queryString : url+"/"+queryString;
    else
        return queryString;
};
