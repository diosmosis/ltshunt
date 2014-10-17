var exports = {},
    lt = window.lt,
    cljs = require('../cljs');

/**
 * TODO
 */
exports.new = function (name, options) {
    var optionsMap = {
        ':command': cljs.keyword(name),
        ':desc': options.desc,
        ':exec': options.exec,
        ':hidden': options.hidden || false
    };

    return lt.objs.command.command(optionsMap);
};

module.exports = exports;