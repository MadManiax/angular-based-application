import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { HttpBaseService } from "./base/HttpBaseService";

import { Observable } from "rxjs/Rx";

/* ---- VIEWMODELS ----- */
import Rule = ge.cim.models.Rule;
/*----UI----*/
import EventRule = ge.cim.models.EventRule;
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;
/*----REST SERVICE---*/
import IRestCounterRule = ge.cim.IRestCounterRule;
import IRestTimingRule = ge.cim.IRestTimingRule;
import IRestBaseRule = ge.cim.IRestBaseRule;
import RestCounterRule = ge.cim.models.RestCounterRule;
import RestTimingRule = ge.cim.models.RestTimingRule;
/* ---------------- */


/**
 * Define the class use to performs request to SamplingRuleExecution Service
 */
@Injectable()
export class SamplingRuleExectionService {

    /* First part of REST service Uri */
    private urlBase : string = "samplingrule/execution";

    constructor(private http: HttpBaseService) {
    }

    /**
     * Edit a rule which may be a counter rule or a timing rule
     * @param rule
     */
    editRule(rule: Rule): Observable<boolean> {
        let observer = new Observable<boolean>(observer => {


            let info = this.checkRuleTypeAndGetObj(rule, () =>
            {
                /**
                 * Edit Counter rule, 'Counter' field has been modified by users and must be passed to REST Service
                 */
                let counterRule = (rule as CounterRule);
                let obj = new RestCounterRule(counterRule.RuleExecutionId);
                obj.Counter = counterRule.Actual;

                return obj;
            },
                () => {

                    let timingRule = (rule as TimingRule);

                    let obj = new RestTimingRule(timingRule.RuleExecutionId);
                    //obj.Actual = timingRule.ActualDateTime.toDate() || null;
                    obj.Actual = new Date();
                    obj.Set = timingRule.Set;

                    return obj;

                }, RuleActionType.Edit);

            let url = `${this.urlBase}/${info.ruleTypeUrl}`;

            console.log("PASSING THIS ", info.obj);

            this.http.putJson(url, info.obj)
                .map((rsp: Response) => rsp as any)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe(() => {
                    observer.next(true)
                    observer.complete();
                });
        });
        return observer;
    }
    /**
     * Trigger next operation on rule which may be a counter rule or a timing rule
     * @param rule
     */
    triggerRule(rule: Rule): Observable<boolean> {

        let observer = new Observable<boolean>(observer => {
            let info = this.checkRuleTypeAndGetObj(rule, () =>
            {
                /**
                 * Trigger Counter rule, 'Set' field has been modified by users and must be passed to REST Service
                 */
                let counterRule = rule as CounterRule;

                let obj = new RestCounterRule(counterRule.RuleExecutionId);
                obj.Set = counterRule.Set;

                return obj;
            },
                () =>
                {

                    let timingRule = rule as TimingRule;

                    let obj = new RestTimingRule(timingRule.RuleExecutionId);
                    //obj.Actual = timingRule.ActualDateTime.toDate() || null;
                    obj.Actual = new Date();
                    obj.Set = timingRule.Set;
                    
                    return obj;

                }, RuleActionType.Trigger);

            let url = `${this.urlBase}/${info.ruleTypeUrl}`;
            
            this.http.putJson(url, info.obj)
                .map((rsp: Response) => rsp as any)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe(() => {
                    observer.next(true)
                    observer.complete();
                });
        });
        return observer;
    }

    private checkRuleTypeAndGetObj(rule: Rule, buildActCounter: Function, buildActTiming: Function, actionType: RuleActionType): any {

        let ruleTypeUrl = (actionType === RuleActionType.Edit ? "edit/" : "trigger/");

        let obj: any;

        if (rule instanceof TimingRule) {
            ruleTypeUrl += "timer";
            let timingRule = (rule as TimingRule);
            obj = buildActTiming(rule as TimingRule);
        }
        if (rule instanceof CounterRule) {

            ruleTypeUrl += "counter";
            let counterRule = (rule as CounterRule);
            obj = buildActCounter(rule as CounterRule);
        }

        return { obj, ruleTypeUrl };
    }

}
/*Enum used to define the rule action type*/
enum RuleActionType {
    Edit,
    Trigger
}

