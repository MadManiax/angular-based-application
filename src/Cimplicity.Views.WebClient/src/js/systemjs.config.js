(function (global) {

    var oConfig = {};
    oConfig.paths = {
        npm : 'lib/'
    }
    oConfig.transpiler = 'plugin-babel';

    oConfig.map = {
        app: 'app',
        'tslib'                 : oConfig.paths.npm + '/tslib',
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
        // Angular material required modules (+)
        '@angular/material'         : oConfig.paths.npm + '/@angular/material/bundles/material.umd.js',
        '@angular/cdk'              : oConfig.paths.npm + '/@angular/cdk/bundles/cdk.umd.js',
        '@angular/cdk/a11y'         : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-a11y.umd.js',
        '@angular/cdk/bidi'         : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-bidi.umd.js',
        '@angular/cdk/observers'    : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-observers.umd.js',
        '@angular/cdk/overlay'      : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-overlay.umd.js',
        '@angular/cdk/portal'       : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-portal.umd.js',
        '@angular/cdk/scrolling'    : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-scrolling.umd.js',
        '@angular/cdk/platform'     : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-platform.umd.js',
        '@angular/cdk/keycodes'     : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-keycodes.umd.js',
        '@angular/cdk/coercion'     : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-coercion.umd.js',
        '@angular/cdk/testing'      : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-testing.umd.js',
        '@angular/cdk/collections'  : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-collections.umd.js',
        '@angular/cdk/rxjs'         : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-rxjs.umd.js',
        '@angular/cdk/table'        : oConfig.paths.npm + '/@angular/cdk/bundles/cdk-table.umd.js',
        "@angular/cdk/accordion"    : oConfig.paths.npm + "/@angular/cdk/bundles/cdk-accordion.umd.js",
        "@angular/cdk/layout"       : oConfig.paths.npm + "/@angular/cdk/bundles/cdk-layout.umd.js",
        "@angular/cdk/stepper"      : oConfig.paths.npm + "/@angular/cdk/bundles/cdk-stepper.umd.js",
        '@angular/animations'       : oConfig.paths.npm + '/@angular/animations/bundles/animations.umd.js',
        '@angular/animations/browser'           : oConfig.paths.npm + '/@angular/animations/bundles/animations-browser.umd.js',
        '@angular/platform-browser/animations'  : oConfig.paths.npm + '/@angular/platform-browser/bundles/platform-browser-animations.umd.js',
        // Angular material required modules (-)
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
            main: './main.js',
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
        'tslib': {
            main: 'tslib.js',
            defaultExtension: 'js'
        },
        moment: {
            main: 'moment.js', defaultExtension: 'js'
        },
        'ng2-dragula': {main: 'ng2-dragula.js', defaultExtension: 'js'},
    }

    System.config(oConfig);

})(this);