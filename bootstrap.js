(function ltshuntImpl() {
    var lt = window.lt,
        path = require('path'),
        fs = require('fs'),
        ltshunt = {};

    ltshunt.cpd = cpd;
    ltshunt.bootstrap = bootstrap;

    /**
     * TODO
     */
    function cpd() {
        return lt.objs.plugins.adjust_path('');
    }

    /**
     * TODO
     */
    function bootstrap(pathToShunt) {
        var pluginRoot = this.cpd(),
            componentsRoot = path.join(pluginRoot, 'components');

        if (!ltshunt.__loaded) {
            requireLtShunt(path.join(pluginRoot, pathToShunt));
        }

        if (!isDirectory(componentsRoot)) {
            return;
        }

        var components = fs.readdirSync(componentsRoot);
        components.forEach(function (name) {
            loadComponent(name);
        });

        function loadComponent(name) {
            var files = walk(path.join(componentsRoot, name));

            // load assets
            files.forEach(function (filePath) {
                if (filePath.substr(-3) == '.js'
                    && filePath.substr(-6) != '.lt.js'
                ) {
                    loadJsFile(filePath);
                } else if (filePath.substr(-4) == '.css') {
                    loadCssFile(filePath);
                } else if (filePath.substr(-5) == '.less') {
                    loadLessFile(filePath);
                }
            });

            // load .lt.js file
            files.forEach(function (filePath) {
                if (filePath.substr(-6) == '.lt.js') {
                    loadLtJsFile(filePath);
                }
            });
        }

        function loadJsFile(path) {
            require(path);
        }

        function loadCssFile(path) {
            lt.objs.plugins.__BEH__load_css(path);
        }

        function loadLessFile(path) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet/less');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', 'file://' + path);
            document.head.appendChild(link);
        }

        function loadLtJsFile(path) {
            var link = document.createElement('script');
            link.setAttribute('type', 'text/javascript');
            link.setAttribute('src', 'file://' + path);
            document.head.appendChild(link);
        }
    }

    function requireLtShunt(pathToShunt) {
        var ltshuntReal = require(pathToShunt);
        ltshuntReal.cpd = ltshunt.cpd;
        ltshuntReal.bootstrap = ltshunt.bootstrap;
        window.ltshunt = ltshuntReal;
    }

    function walk(pathToWalk, output) {
        if (!output) {
            output = [];
        }

        if (isFile(pathToWalk)) {
            output.push(pathToWalk);
        } else if (isDirectory(pathToWalk)) {
            fs.readdirSync(pathToWalk).forEach(function (name) {
                walk(path.join(pathToWalk, name), output);
            });
        }
        return output;
    }

    function isFile(path) {
        try {
            return fs.statSync(path).isFile();
        } catch (err) {
            return false;
        }
    }

    function isDirectory(path) {
        try {
            return fs.statSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    }

    window.ltshunt = ltshunt;
})();
