import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/AuthService";
import User = ge.cim.models.User;

@Injectable()
export class RulesReportRouteGuard implements CanActivate
{
    private static PARAM_USER_ID = "uid";

    constructor(private _oRouter: Router, private _oAuthService: AuthService) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>
    {
        const sParamUserId = route.params[RulesReportRouteGuard.PARAM_USER_ID];


        return new Promise((resolve, reject) => {

            // Perform server request to login user (if necessary)
            // and other authentication operation
            this._oAuthService.doLogin(sParamUserId)
                .then((oResponse)=>{
                    // Authorized
                    resolve(true);
                })
                .catch((oReason)=>{
                    // UNAUTHORIZED
                    this._oRouter.navigate(['/home']);
                    resolve(false);
                });
        });

    }
}