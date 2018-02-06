import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StationComponent } from './station/station.component';
import {RulesReportService} from "./services/RulesReportService";
import {LoadingScreenComponent} from "./components/loading_screen/LoadingScreenComponent";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        StationComponent,
        LoadingScreenComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        RulesReportService
    ]
})
export class AppModule { }