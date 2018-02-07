import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RulesReportRouteGuard implements CanActivate
{
    private static USER_PARAM = "uid";

    constructor(private _oRouter: Router /*, private _oUserService: CurrentUserService*/) {

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean>
    {
        const paramUser = route.params[RulesReportRouteGuard.USER_PARAM];
        //const currentUser = this._oUserService.currentUser;
        // if (paramUser && paramUser !== currentUser.id && !currentUser.admin) {
        //     this._oRouter.navigate(["worksheet"]);
        //     return false;
        // }
        //return true;

        return new Promise((resolve, reject) => {
            // this.authService.getStatus()
            //     .then((user: User)=>{
            //         console.log('home auth', user)
            //         this.router.navigate(['/dashboard']);
            //         resolve(false);
            //     })
            //     .catch(function () {
            //         resolve(true);
            //     });

            setTimeout(()=>{
                if(paramUser == "gooduser" || 1 == 1)
                {
                    // Authorized
                    resolve(true);
                }
                else{
                    // UNAUTHORIZED
                    this._oRouter.navigate(['/home']);
                    resolve(false);
                }
            }, 1000)
        });

    }
}