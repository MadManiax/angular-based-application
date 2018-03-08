import { Injectable } from "@angular/core";
import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from "@angular/http";

import { Observable } from "rxjs/Observable";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/finally";
import {Configurations} from "../../config/AppConfigurations";

/**
 * Base Class to manage Http request in Cimplicity Web Client Project
 */
@Injectable()
export class HttpBaseService extends Http{
    
    constructor(backend: XHRBackend, options: RequestOptions) {
        super(backend, options);
        //this._defaultOptions.withCredentials = true;
        this._defaultOptions.headers.append("Content-Type", "application/json");
        this._defaultOptions.headers.append("Access-Control-Allow-Origin", "*");
        this._defaultOptions.headers.append("Access-Control-Allow-Methods", "*");
    }

    /**
     * Performs a HTTPDELETE Request
     * @param url url of the service
     * @param options request options
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if (options)
            options.withCredentials = true;

        return super.delete(`${Configurations.apiUrl}${url}`, options || this._defaultOptions)
            .catch(this.catchAuthError(this));
    }
    /**
     * Performs a HTTPGET Request
     * @param url url of the service
     * @param options request options
     */
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        if (options)
            options.withCredentials = true;

        return super.get(`${Configurations.apiUrl}${url}`, options || this._defaultOptions)
            .catch(this.catchAuthError(this));
    }
    /**
     * Performs a HTTPPOST Request
     * @param url url of the service
     * @param options request options
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        //if (options) {
        //    options.withCredentials = true;
        //}

        return super.post(`${Configurations.apiUrl}${url}`, body, options || this._defaultOptions)
            .catch(this.catchAuthError(this));
    }
    /**
     * Performs a HTTPPOST Request and automatically parse object in JSON before call starting
     * @param url url of the service
     * @param body any object
     * @param options request options
     */
    postJson(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        
        return this.post(url, JSON.stringify(body), options || this._defaultOptions)
            .catch(this.catchAuthError(this));
    }
    /**
     * Performs a HTTPPUT Request
     * @param url url of the service
     * @param body body of the request
     * @param options request options
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
       //if (options) {
        //    options.withCredentials = true;
        //}
        return super.put(`${Configurations.apiUrl}${url}`, body, options)
            .catch(this.catchAuthError(this));
    }
    /**
     * Performs a HTTPPUT Request and automatically parse object in JSON before call starting
     * @param url url of the service
     * @param body any object
     * @param options request options
     */
    putJson(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        
        return this.put(url, JSON.stringify(body), options || this._defaultOptions)
            .catch(this.catchAuthError(this));
    }

    /**
     * Generic method to catch Errors
     * @param self
     */
    private catchAuthError(self: HttpBaseService) {
        // we have to pass HttpService's own instance here as `self`
        return (res: Response, caught: Observable<Response>) => {
            if (res.status === 401 || res.status === 403) {
                // if not authenticated
                //this.authRouter.goToUnauthorized();
            }
            return Observable.throw(res);
        };
    }
}