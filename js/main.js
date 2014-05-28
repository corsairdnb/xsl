$(function(){

    var body = $("body"),
        form = $(".form"),
        textarea_1 = $(".form__textarea_1"),
        textarea_2 = $(".form__textarea_2"),
        checkboxes = $(".settings__checkbox"),
        result = $(".result"),
        templateUniqueLeft = _.template($("#template-unique-left").html()),
        templateUniqueRight = _.template($("#template-unique-right").html()),
        templateEqual = _.template($("#template-equal").html()),
        templateDiff = _.template($("#template-diff").html()),
        htmlUniqueLeft, htmlUniqueRight, htmlEqual, htmlDiff;

    /*
    * Clear cache
    */
    var clear = function() {
        result.html("");
        sessionStorage.clear();
    };

    /*
    * Render templates, cache results
    */
    var render = function(e) {

        //console.log("render");

        var data_1 = $.trim(textarea_1.val()),
            data_2 = $.trim(textarea_2.val()),
            object_1 = load("unique_1"),
            object_2 = load("unique_2"),
            equal = load("equal"),
            diff = load("diff"),
            showUniqueLeft = $("#settings__checkbox_left").attr("checked"),
            showUniqueRight = $("#settings__checkbox_right").attr("checked"),
            showEqual = $("#settings__checkbox_equal").attr("checked"),
            showDiff = $("#settings__checkbox_diff").attr("checked");

        if ((typeof e !== "undefined" && e.type != "change") || typeof e == "undefined") {

            equal = {};
            diff = {};
            object_1 = {};
            object_2 = {};

            try {
                object_1 = JSON.parse(data_1);
            } catch (e) {
                try {
                    object_1 = JSON.parse(JSON.stringify(paramsFromQueryString(data_1)));
                } catch (e) {
                    clear();
                    return;
                }
            }
            if (_.isEmpty(object_1)) {
                clear();
                return;
            }

            try {
                object_2 = JSON.parse(data_2);
            } catch (e) {
                try {
                    object_2 = JSON.parse(JSON.stringify(paramsFromQueryString(data_2)));
                } catch (e) {
                    clear();
                    return;
                }
            }
            if (_.isEmpty(object_1)) {
                clear();
                return;
            }

            if (object_1 && object_2) {
                for (var key_1 in object_1) {
                    for (var key_2 in object_2) {

                        if (key_1 == key_2) {
                            var temp = {};
                            if (object_1[key_1] == object_2[key_2]) {
                                //temp[key_1] = object_1[key_1];
                                equal[key_1] = object_1[key_1];
                            }
                            else {
                                diff[key_1] = [object_1[key_1], object_2[key_1]];
                            }
                            delete object_1[key_1];
                            delete object_2[key_2];
                            break;
                        }
                    }
                }
                save("diff", diff);
                save("equal", equal);
                save("unique_1", object_1);
                save("unique_2", object_2);
            }

        }

        htmlUniqueLeft = showUniqueLeft && !_.isEmpty(object_1) ? templateUniqueLeft({items: object_1}) : "";
        htmlUniqueRight = showUniqueRight && !_.isEmpty(object_2) ? templateUniqueRight({items: object_2}) : "";
        htmlEqual = showEqual && !_.isEmpty(equal) ? templateEqual({items: equal}) : "";
        htmlDiff = showDiff && !_.isEmpty(diff) ? templateDiff({items: diff}) : "";

        result.html("");
        result.append(htmlUniqueLeft);
        result.append(htmlUniqueRight);
        result.append(htmlEqual);
        result.append(htmlDiff);

    };

    textarea_1.add(textarea_2).add(checkboxes).on("input paste change", render);

    render();

});

// save to sessionStorage
var save = function() {
    switch (arguments.length) {
        case 1:
            sessionStorage.setItem(arguments[0], "");
            return true;
        case 2:
            sessionStorage.setItem(arguments[0], JSON.stringify(arguments[1]));
            return true;
        default:
            return false;
            break;
    }
};

// load from sessionStorage
var load = function() {
    switch (arguments.length) {
        case 1:
            return JSON.parse(sessionStorage.getItem(arguments[0])) || false;
        default:
            return false;
            break;
    }
};