/**
 * Parses current query string as set of parameters
 * @returns Object
 */
var paramsFromQueryString = function() {
    var searchString = location.search,
        searchStringArray,
        searchStringParams = {};
    if (searchString=="") throw new Error("query string is empty");
    searchStringArray = searchString.substr(1).split("&");
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

console.log(paramsToQueryString(paramsFromQueryString()));