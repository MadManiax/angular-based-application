///<reference path="../../../../typings/index.d.ts"/>

import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingScreen, LoadingScreenComponent} from "../../components/loading_screen/LoadingScreenComponent";
import {AuthService} from "../../services/AuthService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'loadingStation',
    templateUrl: 'app/components/page_loading_station/LoadingStationTemplate.html'
})
export class LoadingStationComponent implements OnInit, OnDestroy
{

    constructor(
        private _oAuthService : AuthService,
        private _oActivatedRoute : ActivatedRoute
    )
    {
        console.log('LoadingStationComponent -> constructor');


    }


    //*******************************************************************************
    //* Component lifecycle methods
    //*******************************************************************************
    ///<editor-fold desc="Component lifecycle methods (+)>
    ngOnInit() {
        console.log('LoadingStationComponent -> ngOnInit');

        // var element = document.getElementById('myElement');
        // var topPos = element.getBoundingClientRect().top + window.scrollY;
        // var leftPos = element.getBoundingClientRect().left + window.scrollX;
        $("elementA").offset()

    }

    ngOnDestroy() {
    }
    ///</editor-fold>


    //*******************************************************************************
    //* Private methods
    //*******************************************************************************
    ///<editor-fold desc="Private methods (+)>
    ///</editor-fold>

    //*******************************************************************************
    //* Protected methods
    //*******************************************************************************
    ///<editor-fold desc="Protected methods (+)>
    ///</editor-fold>

    //*******************************************************************************
    //* Public methods
    //*******************************************************************************
    ///<editor-fold desc="Public methods (+)>



    ///</editor-fold>
}