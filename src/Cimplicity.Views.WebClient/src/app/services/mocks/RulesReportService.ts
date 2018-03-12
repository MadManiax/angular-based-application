///<reference path="../../../classes/models/TimingRule.ts"/>
///<reference path="../../../classes/models/CounterRule.ts"/>
///<reference path="../../../classes/models/EventRule.ts"/>
///<reference path="../../../classes/models/Rule.ts"/>
///<reference path="../../../interfaces/IRestRulesReport.ts"/>
///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../dummy_data/report_dummy.ts"/>
///<reference path="../../../classes/models/RestRuleReportResponse.ts"/>
///<reference path="../../../classes/queryreport/ReportOverviewQuery.ts"/>
import { Injectable } from '@angular/core';
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
import EventRule = ge.cim.models.EventRule;
import {Observable} from "rxjs/Observable";
import Rule = ge.cim.models.Rule;
import DUMMY_REPORT_FULL_RESPONSE = ge.cim.dummydata.DUMMY_REPORT_FULL_RESPONSE;
import IBaseServerResponse = ge.cim.IBaseServerResponse;
import RestRuleReportResponse = ge.cim.models.RestRuleReportResponse;
import ReportOverviewQuery = ge.cim.queryreport.ReportOverviewQuery;

@Injectable()
export class RulesReportService
{

    constructor(/*protected _oHtpClient: HttpClient*/)
    {

    }


    public getRules(query: ReportOverviewQuery) : Observable<RestRuleReportResponse>
    {
        //let aoRulesList: Rule[] = [] ;

        let oResponse : RestRuleReportResponse = new RestRuleReportResponse();
        oResponse.CurrentPage = query.Paging.PageNumber;
        oResponse.RowsPerPage = query.Paging.PageSize;

        let oObserver = new Observable<RestRuleReportResponse>(observer => {
            // Immediately return an empty array just to avoid
            // undefined or null array
            observer.next(oResponse);

            // Then perform request
            setTimeout(()=>{
                let oReportResponse : IBaseServerResponse = DUMMY_REPORT_FULL_RESPONSE;

                // Calculate the total number of rows (in some way)
                oResponse.TotalRows = 0;

                let oPageInJson : any = oReportResponse.Result;
                for(let i = 0; i < oPageInJson.length; i++)
                {
                    let oRuleInJson = oPageInJson[i];
                    if( EventRule.isMyJsonInstance(oRuleInJson) == true){ oResponse.Rules.push( new EventRule().fromJSON(oRuleInJson) ); }
                    if (TimingRule.isMyJsonInstance(oRuleInJson) == true) { oResponse.Rules.push( new TimingRule().fromJSON(oRuleInJson) ); }
                    if (CounterRule.isMyJsonInstance(oRuleInJson) == true) { oResponse.Rules.push( new CounterRule().fromJSON(oRuleInJson) ); }
                }

                // set observer value and set it as 'completed'
                observer.next(oResponse);
                observer.complete();
            }, 1000);
        })
        return oObserver;
    }


    public editRule(oRule:Rule) : Observable<boolean>
    {
        let oObserver = new Observable<boolean>(observer => {
            setTimeout(()=>{
                let oReponse : IBaseServerResponse;
                //if(oReponse.)
                observer.complete();
            }, 1000);
        });

        return oObserver;
    }

    public triggerRule(oRule:Rule) : Observable<boolean>
    {
        let oObserver = new Observable<boolean>(observer => {
            setTimeout(()=>{
                let oReponse : IBaseServerResponse;
                //if(oReponse.)
                observer.complete();
            }, 1000);
        });
        return oObserver;
    }

    // public getRules(aoFilters : Filter[])
    // {
    //     let oPromise = new Promise((resolve, reject) => {
    //         if(xxx) {
    //             resolve('ok');
    //         } else {
    //             reject('error');
    //         }
    //     })
    //
    //     return oPromise;
    // }

}