(function (global) {

    var oConfig = {};
    oConfig.paths = {
        npm : 'lib/'
    }
    oConfig.transpiler = 'plugin-babel';

    oConfig.map = {
        app: 'app',
        '@angular/core'         : oConfig.paths.npm + '/@angular/core/bundles/core.umd.js',
        '@angular/common'       : oConfig.paths.npm + '/@angular/common/bundles/common.umd.js',
        '@angular/common/http'  : oConfig.paths.npm + '/@angular/common/bundles/common-http.umd.js',
        '@angular/compiler'     : oConfig.paths.npm + '/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser'         : oConfig.paths.npm + '/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic' : oConfig.paths.npm + '/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/http'         : oConfig.paths.npm + '/@angular/http/bundles/http.umd.js',
        '@angular/router'       : oConfig.paths.npm + '/@angular/router/bundles/router.umd.js',
        '@aspnet/signalr'       : oConfig.paths.npm + '/signalr/dist/browser/signalr.min.js',
        '@angular/forms'        : oConfig.paths.npm + '/@angular/forms/bundles/forms.umd.js',
        'rxjs'                  : oConfig.paths.npm + '/rxjs',
        'angular-in-memory-web-api' : oConfig.paths.npm + '/angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
        'plugin-babel'          : oConfig.paths.npm + '/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build'  : oConfig.paths.npm + '/systemjs-plugin-babel/systemjs-babel-browser.js',
        'moment'                : oConfig.paths.npm + '/moment',
        'dragula'               : oConfig.paths.npm + '/dragula/dist/dragula.min.js',
        'ng2-dragula'           : oConfig.paths.npm + '/ng2-dragula'
    };
    oConfig.packages = {
        app: {
            main: './main.min.js',
            //defaultExtension: 'min.js'
            defaultExtension: 'js'
        },
        rxjs: {
            defaultExtension: 'js'
        },
        'angular2-in-memory-web-api': {
            main: './index.js',
            defaultExtension: 'js'
        },
        moment: {
            main: 'moment.js', defaultExtension: 'js'
        },
        'ng2-dragula': {main: 'ng2-dragula.js', defaultExtension: 'js'},
    }

    System.config(oConfig);

})(this);