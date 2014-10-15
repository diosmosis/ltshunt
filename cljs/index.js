var exports = {},
    cljs = window.cljs,
    ns = require('../ns');

/**
 * TODO
 */
exports.keyword = function (name) {
    return new cljs.core.Keyword(ns.current, name, ns.current + '/' + name); // TODO: need hash?
};

/**
 * TODO
 */
exports.vector = function (data) {
    return new cljs.core.PersistentVector(null, data.length, 5, cljs.core.PersistentVector.EMPTY_NODE, data, null);
};

/**
 * TODO
 */
exports.set = function (data) {
    var setMap = {};
    data.forEach(function (value) {
        setMap[value] = null;
    });

    return new cljs.core.PersistentHashSet(
        null,
        exports.map(setMap),
        null
    );
};

/**
 * TODO
 */
exports.map = function (object) {
    var pairs = [];
    for (var key in object) {
        if (!object.hasOwnProperty(key)) {
            continue;
        }

        if (key.substr(0, 1) == ':') {
            pairs.push(exports.keyword(key));
        } else {
            pairs.push(key);
        }

        pairs.push(object[key]);
    }
    return new cljs.core.PersistentArrayMap(null, pairs.length, pairs, null);
};

/**
 * TODO
 */
exports.variant = function (obj) {
    if (obj instanceof Array) {
        return exports.vector(obj);
    } else if (typeof obj == 'object') {
        if (isSet(obj)) {
            return exports.set(obj);
        } else {
            return exports.map(obj);
        }
    } else {
        return obj;
    }
};

function isSet(obj) {
    for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        if (obj !== undefined) {
            return false;
        }
    }
    return true;
}

module.exports = exports;