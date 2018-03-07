import { Component, OnInit } from '@angular/core';
//import { HubConnection } from "@aspnet/signalr-client";
import { LookupService } from "../services/LookupService";
import { Observable } from "rxjs/Rx";
import IProductionLine = ge.cim.IProductionLine;
import Filter = ge.cim.models.Filter;
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

    constructor(private service:LookupService) {
        console.log('HomeComponent -> constructor');

    }

    tryService() {
        this.service.getProductionLines("getproductionlinesfortest")
            .subscribe((rsp: IProductionLine[]) => { console.log("THIS IS THE RESPONSE =>", rsp); }, (error) => {
                console.info("ERROR => ", error);
            })
        let filters: Filter[] = [new Filter("Test filter caption 1", "Test filter value 1"), new Filter("Test filter caption 2", "Test filter value 2")];
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