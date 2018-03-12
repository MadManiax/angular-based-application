///<reference path="../../../classes/models/TimingRule.ts"/>
///<reference path="../../../classes/models/CounterRule.ts"/>
///<reference path="../../../classes/models/EventRule.ts"/>
///<reference path="../../../classes/models/Rule.ts"/>
///<reference path="../../../interfaces/IRestRulesReport.ts"/>
///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../dummy_data/report_dummy.ts"/>
///<reference path="../../../classes/models/RestRuleReportResponse.ts"/>
///<reference path="../../../classes/queryreport/ReportOverviewQuery.ts"/>
///<reference path="../../../classes/models/ReportOverviewSetting.ts"/>
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
import ReportOverviewSetting = ge.cim.models.ReportOverviewSetting;

@Injectable()
export class ReportConfigurationServiceMock
{

    constructor(/*protected _oHtpClient: HttpClient*/)
    {

    }


    /**
     * NOTE: it will return a 'Promise' due to data will not change often
     * @returns {Promise<ge.cim.models.ReportOverviewSetting>}
     */
    public getConfig() : Promise<ReportOverviewSetting>
    {

        let oPromise = new Promise<ReportOverviewSetting>((resolve, reject)=>{
            // Then perform request
            setTimeout(()=>{
                // TODO: fetch configuration from server
                let oSettings = ReportOverviewSetting.createDefault();

                // set observer value and set it as 'completed'
                resolve(oSettings);
            }, 500);
        })
        return oPromise;
    }


    public saveConfig(oSettings:ReportOverviewSetting) : Promise<boolean>
    {
        let oPromise = new Promise<boolean>((resolve, reject)=>{
            // Then perform request
            setTimeout(()=>{
                // TODO: save configuration
                resolve(true);
            }, 500);
        })
        return oPromise;
    }



}