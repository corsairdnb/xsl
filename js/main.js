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

/**
 * Checks if string is valid JSON
 * @param str
 * @returns Bool
 */
var isJSON = function(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


/* APP */

$(function(){

    var form = $(".form"),
        textarea_1 = $(".form__textarea_1"),
        textarea_2 = $(".form__textarea_2");

    textarea_1.add(textarea_2).on("input paste", function() {
        var data_1 = $.trim(textarea_1.val()),
            data_2 = $.trim(textarea_2.val()),
            object_1, object_2;
        try {
            object_1 = JSON.parse(data_1);
            object_2 = JSON.parse(data_2);
        } catch (e) {
            try {
                console.log(paramsFromQueryString(data_1));
                object_1 = JSON.parse(paramsFromQueryString(data_1));
                console.log(object_1)
                object_2 = JSON.parse(paramsFromQueryString(data_2));
            } catch (e) {
                console.log("not valid JSON");
                return false;
            }
            return false;
        }
        if (object_1 && object_2) {
            /*if (typeof data_1 !== "object") data_1 = paramsFromQueryString(data_1);
            if (typeof data_2 !== "object") data_2 = paramsFromQueryString(data_2);*/

            console.log(object_1);
            console.log(object_2);

            /*if (_.isEqual(data_1, data_2))
                console.log("equal");
            else
                console.log("no");*/
            //console.log(data_2);
        }
        return true;
    });

});