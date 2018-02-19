(function (global) {
    System.config({
        paths: {
            'npm:': 'lib/'
        },
        transpiler: 'plugin-babel',
        map: {
            app: 'app',
            '@angular/core'         : 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common'       : 'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http'  : 'npm:@angular/common/bundles/common-http.umd.js',
            '@angular/compiler'     : 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser'         : 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic' : 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http'         : 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router'       : 'npm:@angular/router/bundles/router.umd.js',
            '@aspnet/signalr'       : 'npm:signalr/dist/browser/signalr.min.js',
            '@angular/forms'        : 'npm:@angular/forms/bundles/forms.umd.js',
            '@angular/material'     : 'npm:@angular/material/bundles/material.umd.js',
            '@angular/animations'   : 'npm:@angular/animations/bundles/animations.umd.js',
            // CDK individual packages
            //'@angular/cdk'          : 'npm:@angular/cdk',
            '@angular/cdk/platform' : 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/a11y'     : 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            //'@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            //'@angular/common/http/testing' : 'npm:@angular/common/bundles/common-http-testing.umd.js',
            //'tslib': 'npm:tslib/tslib.js',
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
            'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
            'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js',
            //'moment': 'npm:moment/min'
            'moment': 'npm:moment',
        },
        packages: {
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
            // 'moment': {
            //     main: './moment-with-locales.min.js',
            //     defaultExtension: 'min.js'
            // }
            moment: {
                main: 'moment.js', defaultExtension: 'js'
            },


        }
    });
})(this);