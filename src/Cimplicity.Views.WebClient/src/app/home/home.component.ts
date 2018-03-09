import { Component, OnInit } from '@angular/core';
//import { HubConnection } from "@aspnet/signalr-client";
import { LookupService } from "../services/LookupService";
import { SamplingRuleExectionService } from "../services/SamplingRuleExecutionService";
import { ReportOverviewService } from "../services/ReportOverviewService";
import TimingRule = ge.cim.models.TimingRule;
import CounterRule = ge.cim.models.CounterRule;

@Component({
    selector: 'home',
    template: `
        <h1>Home</h1>
        <p>Hello you !</p>
        <ul>
        <li *ngFor="let m of messages">m</li>
        </ul>
        <button (click)="tryService()">Send!!!</button>
    `
})
export class HomeComponent implements OnInit {

    //private _hubConnection: HubConnection;
    //message = '';
    //messages: string[] = [];

    constructor(private service: LookupService, private reportService: ReportOverviewService, private samplingService: SamplingRuleExectionService) {
        console.log('HomeComponent -> constructor');

    }

    tryService() {
        let counter = new CounterRule();
        let timing = new TimingRule();
        counter.Actual = 2;
        counter.RuleExecutionId = "50525D5A-6261-4265-B468-87B2B48C1868";
        
        this.samplingService.editRule(counter).subscribe();

        //this.service.getProductionLines("IM900001").subscribe(
        //    (pl: IProductionLine[]) => {
        //        console.log("PRODUCTION LINES => ", pl);
        //        this.service.getWorkCells(pl.map(p => new Filter(p.DisplayName, p.S95Id)))
        //            .subscribe((wl: IWorkCell[]) => {
        //                console.log("WORK CELLS => ", wl);
        //                this.service.getWorkUnits(wl.map(w => new Filter(w.DisplayName, w.S95Id))).subscribe((wt: IWorkUnit[]) => {
        //                    console.log("WORK UNITS => ", wt);
        //                    this.service.getMaterialDefinitions(wl.map(wwl => new Filter(wwl.DisplayName, wwl.S95Id)), wt.map(wwt => new Filter(wwt.DisplayName, wwt.S95Id)))
        //                        .subscribe((materialsDef: IMaterial[]) => {
        //                            console.log("MATERIAL DEFINITIONS => ", materialsDef);
        //                        });
        //                });
        //            }, (error) => { console.log(error.ExceptionMessage);});
        //});

        //let query = FluentQuery.onWorkArea("IM900001")
        //    /*.withFiltersOnProductionLines([new Filter("", "WR900001")])
        //    .withFiltersOnWorkCell([new Filter("", "WL900001"), new Filter("", "WL900002")])*/.addOrderBy(FieldOrder.RuleType, SortDirection.Asc).build();

        //this.reportService.getRules(query).subscribe((rules: Rule[]) => {
        //    console.log("RULES => ", rules);
        //});
    }

    ngOnInit() {
        console.log('HomeComponent -> ngOnInit');
    //    this._hubConnection = new HubConnection("/testHub");

    //    this._hubConnection.on('Send', (data: any) => {
    //        const received = `Received: ${data}`;
    //        this.messages.push(received);
    //    });

    //    this._hubConnection.start()
    //        .then(() => {
    //            console.log('Hub connection started')
    //        })
    //        .catch(err => {
    //            console.log('Error while establishing connection')
    //        });
   }
    //public sendMessage(): void {
    //    const data = `Sent: ${this.message}`;

    //    this._hubConnection.invoke('Send', data);
    //    this.messages.push(data);
    //}
}