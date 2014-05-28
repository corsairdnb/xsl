$(function(){

    var body = $("body"),
        form = $(".form"),
        textarea_1 = $(".form__textarea_1"),
        textarea_2 = $(".form__textarea_2"),
        result = $(".result"),
        templateUniqueLeft = _.template($("#template-unique-left").html()),
        templateUniqueRight = _.template($("#template-unique-right").html()),
        templateEqual = _.template($("#template-equal").html()),
        templateDiff = _.template($("#template-diff").html()),
        htmlUniqueLeft, htmlUniqueRight, htmlEqual, htmlDiff;

    textarea_1.add(textarea_2).on("input paste", function() {

        var data_1 = $.trim(textarea_1.val()),
            data_2 = $.trim(textarea_2.val()),
            object_1, object_2,
            equal = {},
            diff = {},
            showUniqueLeft = $("#settings__checkbox_left").attr("checked"),
            showUniqueRight = $("#settings__checkbox_right").attr("checked"),
            showEqual = $("#settings__checkbox_equal").attr("checked"),
            showDiff = $("#settings__checkbox_diff").attr("checked");

        try {
            object_1 = JSON.parse(data_1);
        } catch (e) {
            try {
                object_1 = JSON.parse(JSON.stringify(paramsFromQueryString(data_1)));
            } catch (e) {
                throw new Error("not valid 1");
            }
        }
        if (_.isEmpty(object_1)) throw new Error("not valid 1");

        try {
            object_2 = JSON.parse(data_2);
        } catch (e) {
            try {
                object_2 = JSON.parse(JSON.stringify(paramsFromQueryString(data_2)));
            } catch (e) {
                throw new Error("not valid 2");
            }
        }
        if (_.isEmpty(object_1)) throw new Error("not valid 2");

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
            /*console.log("diff ",diff);
            console.log("equal ",equal);
            console.log("unique1 ",object_1);
            console.log("unique2 ",object_2);*/
        }

        htmlUniqueLeft = showUniqueLeft ? templateUniqueLeft({items: object_1}) : "";
        htmlUniqueRight = showUniqueRight ? templateUniqueRight({items: object_2}) : "";
        htmlEqual = showEqual ? templateEqual({items: equal}) : "";
        htmlDiff = showDiff ? templateDiff({items: diff}) : "";

        result.html("");
        result.append(htmlUniqueLeft);
        result.append(htmlUniqueRight);
        result.append(htmlEqual);
        result.append(htmlDiff);

    });



});