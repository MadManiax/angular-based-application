import { Component, OnInit } from '@angular/core';
import VexUtils = jsutils.VexUtils;

@Component({
    selector: 'my-app',
    template: "<loading-screen></loading-screen><router-outlet></router-outlet>",
    // template: `
    //     <div class="container">
    //         <h1>Angular 2 & TypeScript web application</h1>
    //         <h2>Mad  e with ASP.NET Core and Visual Studio 2017</h2>
    //         <nav>
    //             <a routerLink="home" routerLinkActive="active">Home</a>
    //             <a routerLink="about">About</a>
    //         </nav>
    //         <router-outlet></router-outlet>
    //     </div>
    // `,
    providers: []
})
export class AppComponent implements OnInit {

    constructor() {
        console.log('AppComponent -> constructor');
    }

    ngOnInit() {
        console.log('AppComponent -> ngOnInit');
        VexUtils.setDefaultTheme();
    }
}