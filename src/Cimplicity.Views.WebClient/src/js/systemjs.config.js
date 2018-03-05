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
        // Angular material required modules (+)
        '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
        '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
        '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
        '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
        '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
        '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
        '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
        '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
        '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
        '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
        '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
        '@angular/cdk/testing': 'npm:@angular/cdk/bundles/cdk-testing.umd.js',
        '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
        '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
        '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
        "@angular/cdk/accordion": "npm:@angular/cdk/bundles/cdk-accordion.umd.js",
        "@angular/cdk/layout": "npm:@angular/cdk/bundles/cdk-layout.umd.js",
        "@angular/cdk/stepper": "npm:@angular/cdk/bundles/cdk-stepper.umd.js",
        '@angular/animations'   : 'npm:@angular/animations/bundles/animations.umd.js',
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