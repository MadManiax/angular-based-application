import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { HttpBaseService } from "./base/HttpBaseService";
import { Observable, Subscriber } from "rxjs/Rx";
import Rule = ge.cim.models.Rule;
import RestRuleReportResponse = ge.cim.models.RestRuleReportResponse;
import IBaseServerResponse = ge.cim.IBaseServerResponse;
import ReportOverviewQuery = ge.cim.queryreport.ReportOverviewQuery;

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
    getRules(query: ReportOverviewQuery): Observable<RestRuleReportResponse> {
        let observer = new Observable<RestRuleReportResponse>(observer => {

            this.http.post(`reportoverview/getrules`, query)
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as RestRuleReportResponse);
                    observer.complete();
                });
        });
        return observer;
    }
}