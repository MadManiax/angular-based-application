
import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'loading-screen',
    templateUrl: 'app/components/loading_screen/LoadingScreenTemplate.html'
})
export class LoadingScreenComponent implements OnInit
{
    private static ELEM_ID : string = "geLoadingScreen";
    private static ELEM_JQUERY : JQuery = null;

    private static getLoadingScreenElem()
    {
        if( LoadingScreenComponent.ELEM_JQUERY == null)
        {
            LoadingScreenComponent.ELEM_JQUERY = $("#" + LoadingScreenComponent.ELEM_ID);
        }
        return LoadingScreenComponent.ELEM_JQUERY;
    }

    public static showLoadingScreen()
    {
        LoadingScreenComponent.getLoadingScreenElem().show();
    }
    public static hideLoadingScreen()
    {
        LoadingScreenComponent.getLoadingScreenElem().hide();
    }


    private _bIsVisible : boolean;

    constructor()
    {
        console.log('LoadingScreenComponent -> constructor');
        this._bIsVisible = false;
    }

    ngOnInit()
    {
        console.log('LoadingScreenComponent -> ngOnInit');
    }

    public setVisible(){ this._bIsVisible = true;}
    public setHidden(){ this._bIsVisible = false;}

    public isVisible()
    {
        return this._bIsVisible;
    }

    public getElemId(){ return LoadingScreenComponent.ELEM_ID; }
}


export class LoadingScreen{
    public static show(){
       LoadingScreenComponent.showLoadingScreen();
    }

    public static hide(){
        LoadingScreenComponent.hideLoadingScreen();
    }
}