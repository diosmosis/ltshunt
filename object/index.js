var exports = {},
    lt = window.lt,
    cljs = require('../cljs');

/**
 * TODO
 */
function ObjectTemplate(objectNameKeyword) {
    this._typename = objectNameKeyword;
}

ObjectTemplate.prototype.new = function () {
    return lt.object.create(this._typename);
};

/**
 * TODO
 */
exports.type = function (typename, properties) {
    var objectTypeNameKeyword = cljs.keyword(typename),
        args = [
            objectTypeNameKeyword
        ];

    if (properties[':tags']) {
        var setElements = properties[':tags'].map(function (keyword) {
            return cljs.keyword(keyword.substr(1), null);
        });
        properties[':tags'] = cljs.set.apply(null, setElements);
    }

    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue;
        }

        args.push(cljs.keyword(key.substr(1), null));
        args.push(cljs.variant(properties[key]));
    }

    lt.object.object_STAR_.apply(null, args);

    return new ObjectTemplate(objectTypeNameKeyword);
};

module.exports = exports;