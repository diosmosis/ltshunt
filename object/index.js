var exports = {},
    lt = window.lt,
    angular = window.angular,
    cljs = require('../cljs'),
    cljsCore = window.cljs.core;

/**
 * TODO
 */
function ObjectTemplate(objectNameKeyword) {
    this._typename = objectNameKeyword;
}

/**
 * TODO
 */
ObjectTemplate.prototype.new = function () {
    return lt.object.create(this._typename);
};

/**
 * TODO
 */
function LtObjectProxy(ltObj) {
    this._object = ltObj;
}

/**
 * TODO
 */
LtObjectProxy.prototype.$watch = function (property, callback) {
    var self = this;
    return this._object._$scope.$watch(
        function () {
            return self.get(property);
        },
        callback
    );
};

/**
 * TODO
 */
LtObjectProxy.prototype.get = function (property) {
    return exports.get(this._object, property);
};

/**
 * TODO
 */
LtObjectProxy.prototype.set = function (property, value) {
    return exports.set(this._object, property, value);
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

/**
 * TODO
 */
exports.set = function (ltObj, name, value) {
    var change = {};
    change[':' + name] = value;

    var result = lt.object.merge_BANG_(ltObj, cljs.map(change));
    if (ltObj._$scope) {
        ltObj._$scope.$digest();
    }

    return result;
};

/**
 * TODO
 */
exports.get = function (ltObj, name) {
    return cljs.keyword(name, null).cljs$core$IFn$_invoke$arity$1(cljsCore.deref(ltObj));
};

/**
 * TODO
 */
exports.forAngularService = function (serviceName, tags, properties) {
    if (!properties) {
        properties = {};
    }

    var objectProperties = angular.extend({}, properties, {
        ':tags': tags
    });
    var objectTemplate = exports.type(serviceName, objectProperties);

    var ltObj = objectTemplate.new();

    // TODO: note somewhere how window.ltshunt must be accessed as window.ltshunt at all times from within ltshunt itself
    window.angular.module(window.ltshunt._currentAppName).service(serviceName + 'Lt', function ($rootScope) {
        ltObj._$scope = $rootScope.$new();
        return new LtObjectProxy(ltObj);
    });

    return ltObj;
};

module.exports = exports;