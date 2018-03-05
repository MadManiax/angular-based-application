module.exports = function () {

    var base = {
        source: "./src/",
        webroot: "./wwwroot/",
        node_modules: "./node_modules/"
    };

    var config = {
        /**
         * Files paths
         */
        angular                 : base.node_modules + "@angular/**/*.{js,ts,json}",
        srcBaseDir              : base.source,
        srcLibDir               : base.source + 'lib',
        sourceAppOtherFiles     : base.source + "app/**/*.{html,txt,md}",
        htmlSource              : base.source +  '**/*.html',
        sourceAppDir            : base.source + "app",
        sourceApp               : base.source + "app" + "/**/*.{js,html,map}",
        styleSrc                : base.source + "style",
        cssSrc                  : base.source + "style/**/*.css",
        jsFilesSrc              : base.source + "js/*.js",
        assetsDirSrc            : base.source + "assets",
        imagesDirSrc            : base.source + "assets/images",

        destBaseDir             : base.webroot,
        destApp                 : base.webroot + "app",
        destJS                  : base.webroot + 'js',
        cssDestDir              : base.webroot + 'css',
        htmlDest                : base.webroot,
        assetsDirDest           : base.webroot + "assets",
        imagesDirDest           : base.webroot + "assets/images",

        lib             : base.webroot + "lib/",
        node_modules    : base.node_modules,
        angular         : base.node_modules + "@angular/{**, *.*}",
        angularWebApi: base.node_modules + "angular2-in-memory-web-api/*.js",
        corejs: base.node_modules + "core-js/client/shim*.js",
        zonejs: base.node_modules + "zone.js/dist/zone*.js",
        reflectjs: base.node_modules + "reflect-metadata/Reflect*.js",
        systemjs: base.node_modules + "systemjs/dist/*.js",
        rxjs: base.node_modules + "rxjs/**/*.js",
        jasminejs: base.node_modules + "jasmine-core/lib/jasmine-core/*.*",
        shim_es6: base.node_modules + "es6-shim/es6*.*",
        shim_es5: base.node_modules + "es5-shim/es5*.*",
        signalr: base.node_modules + "@aspnet/signalr/dist/*/*.*",
        plugin_babel: base.node_modules + "systemjs-plugin-babel/*.js",
        moment: base.node_modules + "moment/min/*.js",
        dragula: base.node_modules + "dragula/dist/{**, *.*}",
        ng2_dragula: base.node_modules + "ng2-dragula/{**, *.*}",
        tslib: base.node_modules+ "tslib/**/*.js",

        index: "index.html",
        indexDest: base.webroot
    };

    return config;
};