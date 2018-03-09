import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { HttpBaseService } from "./base/HttpBaseService";

import { Observable, Subscriber } from "rxjs/Rx";

import Filter = ge.cim.models.Filter;


/* ---- VIEWMODELS ----- */
import Rule = ge.cim.models.Rule;
import IBaseServerResponse = ge.cim.IBaseServerResponse;
import ReportOverviewQuery = ge.cim.queryreport.ReportOverviewQuery;
/* ---------------- */


/**
 * Define the class use to performs request to Report Overview Service
 */
@Injectable()
export class ReportOverviewService {
    constructor(private http: HttpBaseService) {

    }
    /**
     * Retrieve the List of rules according to given query
     * @param query the query to filter for
     */
    getRules(query: ReportOverviewQuery): Observable<Rule[]> {
        let observer = new Observable<Rule[]>(observer => {

            this.http.post(`reportoverview/getrules`, query)
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as Rule[]);
                    observer.complete();
                });
        });
        return observer;
    }
}