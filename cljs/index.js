var exports = {},
    cljs = window.cljs,
    ns = require('../ns');

/**
 * TODO
 */
exports.keyword = function (name, namespace) {
    namespace = namespace === undefined ? ns.current : namespace;

    var fqn = namespace ? (namespace + '/') : '';
    fqn += name;

    return new cljs.core.Keyword(namespace, name, fqn); // TODO: need hash?
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
exports.set = function () {
    var pairs = [];
    for (var key in arguments) {
        if (!arguments.hasOwnProperty(key)) {
            continue;
        }

        pairs.push(arguments[key]);
        pairs.push(null);
    }

    return new cljs.core.PersistentHashSet(
        null,
        exports.pairsToMap(pairs),
        null
    );
};

/**
 * TODO
 */
exports.pairsToMap = function (pairs) {
    return new cljs.core.PersistentArrayMap(null, pairs.length / 2, pairs, null);
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
            pairs.push(exports.keyword(key.substr(1), null));
        } else {
            pairs.push(key);
        }

        pairs.push(object[key]);
    }
    return exports.pairsToMap(pairs);
};

/**
 * TODO
 */
exports.variant = function (obj) {
    if (obj instanceof Array) {
        return exports.vector(obj);
    } else if (obj !== null
               && typeof obj == 'object'
               && obj.constructor.name == 'Object'
    ) {
        if (isSet(obj)) {
            return exports.set.apply(null, Object.keys(obj));
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