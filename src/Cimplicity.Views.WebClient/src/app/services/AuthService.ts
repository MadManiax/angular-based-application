///<reference path="../../classes/models/TimingRule.ts"/>
///<reference path="../../classes/models/CounterRule.ts"/>
///<reference path="../../classes/models/EventRule.ts"/>
///<reference path="../../classes/models/Rule.ts"/>
///<reference path="../../classes/models/User.ts"/>
import { Injectable } from '@angular/core';
import User = ge.cim.models.User;
import Utils = jsutils.Utils;

@Injectable()
export class AuthService
{
    private _oLoggedUser : User;

    constructor()
    {

    }


    public setLoggedUser(oUser : User){ this._oLoggedUser = oUser; }
    public getLoggedUser():User{ return this._oLoggedUser; }

    public doLogin(sUserId : string)
    {
        return new Promise((resolve, reject) => {
            setTimeout(()=>{
                if( Utils.isNullOrUndef(sUserId) == false )
                {
                    this.setLoggedUser(new User(sUserId));
                    resolve();
                }
                else {
                    reject();
                }
            }, 1000)

        });
    }


    public isLoggedUserAuthorizedRulesReport() : boolean
    {
        return (this.getLoggedUser().sUserId == "gooduser");
    }

}