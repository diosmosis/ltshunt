var exports = {},
    lt = window.lt,
    cljs = require('../cljs');

/**
 * TODO
 */
function ObjectTemplate(objectNameKeyword) {
    this._typename = objectNameKeyword;
}

ObjectTempalte.prototype.new = function () {
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

    for (var key in properties) {
        if (!properties.hasOwnProperty(key)) {
            continue;
        }

        args.push(cljs.keyword(key));
        args.push(cljs.variant(properties[key]));
    }

    lt.object.object_STAR_.apply(null, args);

    return new ObjectTempate(objectTypeNameKeyword);
};

module.exports = exports;