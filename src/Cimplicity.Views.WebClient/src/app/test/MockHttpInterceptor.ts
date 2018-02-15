import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class MockHttpInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let url: string = request.url;
        let method: string = request.method;

        // logger.debug("url = ", url);
        // logger.debug("method = ", method);
        debugger;

        return demographicBackend(url, method, request) ||
            next.handle(request); // fallback in case url isn't caught
    }

}



export function demographicBackend(url: string, method: string, request: HttpRequest<any>): Observable<HttpEvent<any>>
{

    debugger;
    if (url.endsWith('demographic/user') && method === "GET") {

        // would normally get the username from a cookie or token
        let username = "hank";

        // find if any user matches login credentials
        let filteredUser = [{
            id : 1,
            firstName : "PippoFirst",
            lastName : "PippoLast",
            username : "Pippo",
            preferredEmail : "nomail"

        }];

        // check to see if the user exists
        if (filteredUser.length) {
            let user = filteredUser[0];
            return new Observable(resp => {
                resp.next(new HttpResponse({
                    status: 200,
                    body: {
                        "id": user.id,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "username": user.username,
                        "preferredEmail": user.preferredEmail
                    }
                }));
                resp.complete();
            });
        } else {
            // else return 400 bad request
            return new Observable(resp => {
                resp.next(new HttpResponse({
                    status: 400,
                    body: { error: "Unauthorized" }
                }));
                resp.complete();
            });
        }
    }
}