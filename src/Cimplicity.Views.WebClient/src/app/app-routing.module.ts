import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StationComponent } from "./station/station.component";
import {RulesReportRouteGuard} from "./route_guards/RulesReportRouteGuard";



//********************************************************************************************
//* Route configuration
//* NOTE: to authorize a route, see:
//* http://www.sparkbit.pl/angular-2-route-guards-real-life-example/
//********************************************************************************************
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'station/', redirectTo: 'home' }, // not allowed 'station' without a user ID, go to home
    { path: 'station/:uid', component: StationComponent, canActivate: [RulesReportRouteGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash:true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }