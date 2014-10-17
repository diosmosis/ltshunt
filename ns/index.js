var currentNamspace = "",
    currentNamespaceFile = "";

function ns(namespace) {
    currentNamspace = namespace;
    currentNamespaceFile = getCallingFile();
}

ns.__defineGetter__('current', function () {
    if (!fileInCallStack(currentNamespaceFile)) {
        currentNamspace = "";
    }

    return currentNamspace;
});

function getCallingFile() {
    var stack = getStack();
    return stack[1].getFileName();
}

function fileInCallStack(file) {
    var stack = getStack();
    for (var i = 0; i != stack.length; ++i) {
        if (stack[i].getFileName() == file) {
            return true;
        }
    }
    return false;
}

function getStack() {
    var original = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack){ return stack; };

    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;

    Error.prepareStackTrace = original;

    return stack;
}

module.exports = ns;