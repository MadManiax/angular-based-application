
import {Component, Input, OnInit} from '@angular/core';


@Component({
    selector: 'loading-screen',
    templateUrl: 'app/components/loading_screen/LoadingScreenTemplate.html'
})
export class LoadingScreenComponent implements OnInit
{
    public static IS_VISIBLE : boolean = false;

    constructor()
    {
        console.log('LoadingScreenComponent -> constructor');
    }

    ngOnInit() {
        console.log('LoadingScreenComponent -> ngOnInit');

    }

    @Input('externalVal')
    set updateInternalVal(externalVal) {
        this.internalVal = externalVal;
    }

    public isVisible(){
        return LoadingScreenComponent.IS_VISIBLE;
    }

}


export class LoadingScreen{
    public static show(){
        LoadingScreenComponent.IS_VISIBLE = true;
    }

    public static hide(){
        LoadingScreenComponent.IS_VISIBLE = false;
    }
}