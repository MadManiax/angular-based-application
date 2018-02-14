import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BaseRequestOptions, Http, HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StationComponent } from './station/station.component';
import {RulesReportService} from "./services/RulesReportService";
import {LoadingScreenComponent} from "./components/loading_screen/LoadingScreenComponent";
import {RulesReportRouteGuard} from "./route_guards/RulesReportRouteGuard";
import {AuthService} from "./services/AuthService";
import {RulesReportTableComponent} from "./components/rules_report_table/RulesReportTableComponent";
import {FormsModule} from "@angular/forms";
import {DatetimePickerComponent} from "./components/datetimepicker/DatetimePickerComponent";
//import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
// import {HttpClientTestingModule} from "@angular/common/http/testing";
// import {MockHttpInterceptor} from "./test/MockHttpInterceptor";




@NgModule({
    imports: [
        BrowserModule,
        //HttpClientModule,   // include HttpClientModule after BrowserModule
        //HttpClientTestingModule,
        AppRoutingModule,
        FormsModule         // required to use ngModel on input etc...
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        StationComponent,
        LoadingScreenComponent,
        RulesReportTableComponent,
        DatetimePickerComponent
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        RulesReportRouteGuard,
        AuthService,
        RulesReportService,
        // {
        //     provide: HTTP_INTERCEPTORS,
        //     useClass: MockHttpInterceptor,
        //     multi: true
        // }
    ]
})
export class AppModule { }