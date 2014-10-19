var exports = {},
    lt = window.lt,
    cljs = require('../cljs');

/**
 * TODO
 */
exports.new = function (name, options) {
    if (options.params) {
        for (var i = 0; i != options.params.length; ++i) {
            options.params[i] = cljs.map(makeKeywordKeys(options.params[i]));
        }
        options.params = cljs.vector(options.params);
    }

    if (options.triggers) {
        options.triggers = options.triggers.map(function (keyword) {
            return cljs.keyword(keyword.substr(1), null);
        });
        options.triggers = cljs.set.apply(null, options.triggers);
    }

    var params = [cljs.keyword(name)];
    for (var key in options) {
        if (!options.hasOwnProperty(key)) {
            continue;
        }

        params.push(cljs.keyword(key, null));
        params.push(cljs.variant(options[key]));
    }

    return lt.object.behavior_STAR_.apply(null, params);
};

function makeKeywordKeys(data) {
    var result = {};
    for (var key in data) {
        if (!data.hasOwnProperty(key)) {
            continue;
        }

        result[':' + key] = data[key];
    }
    return result;
}

module.exports = exports;