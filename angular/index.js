var exports = {},
    angular = window.angular;

/**
 * TODO
 */
exports.directive = function (appName, directiveName, attributes) {
    var element = angular.element(directiveName);
    for (var key in attributes) {
        if (!attributes.hasOwnProperty(key)) {
            continue;
        }

        element.attr(key, attributes[key]);
    }

    angular.module(appName).config(function ($compile, $rootScope) {
        $compile(element)($rootScope.$new());
    });

    return element;
};

module.exports = exports;