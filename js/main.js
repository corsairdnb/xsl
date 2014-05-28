$(function(){

    var body = $("body"),
        form = $(".form"),
        textarea_1 = $(".form__textarea_1"),
        textarea_2 = $(".form__textarea_2");

    textarea_1.add(textarea_2).on("input paste", function() {
        var data_1 = $.trim(textarea_1.val()),
            data_2 = $.trim(textarea_2.val()),
            object_1, object_2,
            unique_1 = [],
            unique_2 = [],
            equal = [],
            diff = {};

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
                            temp[key_1] = object_1[key_1];
                            equal.push(temp)
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
            /*console.log("equal ",equal);
            console.log("diff ",diff);
            console.log("unique1 ",object_1);
            console.log("unique2 ",object_2);*/
        }
    });



});