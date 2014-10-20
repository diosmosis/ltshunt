var exports = {},
    document = window.document,
    angular = window.angular,
    ltshunt = window.ltshunt;

/**
 * TODO
 */
exports.invoke = function (callback) {
    angular.element(document).injector().invoke(callback);
};

/**
 * TODO
 */
exports.directive = function (appName, directiveName, attributes) {
    var element = window.document.createElement(directiveName);
    for (var key in attributes) {
        if (!attributes.hasOwnProperty(key)) {
            continue;
        }

        element.setAttribute(key, attributes[key]);
    }

    if (ltshunt.angularBootstrapped) {
        exports.invoke(function ($compile, $rootScope) {
            $compile(element)($rootScope.$new());
        });
    }

    return element;
};

module.exports = exports;