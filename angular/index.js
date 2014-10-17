var exports = {},
    angular = window.angular;

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

    angular.module(appName).config(function ($compile, $rootScope) {
        $compile(element)($rootScope.$new());
    });

    return element;
};

module.exports = exports;