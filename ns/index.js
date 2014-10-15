var currentNamspace = "",
    currentNamespaceFile = "";

function ns(namespace) {
    currentNamspace = namespace;
    currentNamespaceFile = getCallingFile();
}

ns.__defineGetter__('current', function () {
    if (currentNamespaceFile != getCallingFile()) {
        currentNamspace = "";
    }

    return currentNamspace;
});

function getCallingFile() {
    var original = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };

    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;

    Error.prepareStackTrace = original;

    return stack[1].getFileName();
}

module.exports = ns;