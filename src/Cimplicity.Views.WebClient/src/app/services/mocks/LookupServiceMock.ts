///<reference path="../../../classes/models/TimingRule.ts"/>
///<reference path="../../../classes/models/CounterRule.ts"/>
///<reference path="../../../classes/models/EventRule.ts"/>
///<reference path="../../../classes/models/Rule.ts"/>
///<reference path="../../../interfaces/IRestRulesReport.ts"/>
///<reference path="../../../classes/utils/Utils.ts"/>
///<reference path="../../../dummy_data/report_dummy.ts"/>
///<reference path="../../../interfaces/IProductionLine.ts"/>
///<reference path="../../../interfaces/IWorkUnit.ts"/>
///<reference path="../../../interfaces/IMaterial.ts"/>
///<reference path="../../../interfaces/IWorkCell.ts"/>
///<reference path="../../../classes/models/Filter.ts"/>
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LookupService} from "../LookupService";
import {HttpBaseService} from "../base/HttpBaseService";
import IProductionLine = ge.cim.IProductionLine;
import Filter = ge.cim.models.Filter;
import IWorkCell = ge.cim.IWorkCell;
import IMaterial = ge.cim.IMaterial;
import IWorkUnit = ge.cim.IWorkUnit;

@Injectable()
export class LookupServiceMock extends LookupService
{

    constructor(oHttpBaseService : HttpBaseService)
    {
        super(oHttpBaseService);
    }


    /**
     * Retrieve the List of the Production Lines associated to the Work Area
     * @param workArea workArea for which looking for production lines
     */
    getProductionLines(workArea: string): Observable<IProductionLine[]>
    {
        let observer = new Observable<IProductionLine[]>(observer => {

            // Send empty value to clean previos data (if any)
            observer.next([]);

            setTimeout(()=>{
                let oData : IProductionLine[] = [];

                for(let i = 0; i < 10; i++)
                {
                    oData.push({
                        DisplayName : "Prod Line" + i,
                        EquipmentId : "EqId_" + i,
                        ParentEquipmentId : "Parent_Eq_ID_" + i,
                        S95Id : "S95ID_" + i
                    })
                }

                observer.next(oData);
                observer.complete();
            }, 1000)
        });
        return observer;
    }
    /**
     * Retrieve the List of the Work Cells associated to the Production Lines
     * @param productionLinesFilter Filter setted by the user
     */
    getWorkCells(productionLinesFilter: Filter[]): Observable<IWorkCell[]>
    {
        let observer = new Observable<IProductionLine[]>(observer => {

            // Send empty value to clean previos data (if any)
            observer.next([]);

            setTimeout(()=>{
                let oData : IProductionLine[] = [];

                for(let i = 0; i < 10; i++)
                {
                    oData.push({
                        DisplayName : "Work Cell" + i,
                        EquipmentId : "EqId_" + i,
                        ParentEquipmentId : "Parent_Eq_ID_" + i,
                        S95Id : "S95ID_" + i
                    })
                }

                observer.next(oData);
                observer.complete();
            }, 1000)
        });
        return observer;
    }
    /**
     * Retrieve the List of the Work Units associated to the Work cells
     * @param workCellsFilter Filter setted by the user
     */
    getWorkUnits(workCellsFilter: Filter[]): Observable<IWorkUnit[]>
    {
        let observer = new Observable<IWorkUnit[]>(observer => {

            // Send empty value to clean previos data (if any)
            observer.next([]);

            setTimeout(()=>{
                let oData : IWorkUnit[] = [];

                for(let i = 0; i < 10; i++)
                {
                    oData.push({
                        DisplayName : "Work Unit" + i,
                        EquipmentId : "EqId_" + i,
                        ParentEquipmentId : "Parent_Eq_ID_" + i,
                        S95Id : "S95ID_" + i
                    })
                }

                observer.next(oData);
                observer.complete();
            }, 1000)
        });
        return observer;
    }
    /**
     * Retrieve the List of the material definitions associated to the choosen workCells and workUnits
     * @param workCellsFilter WL Filter setted by the user
     * @param workUnitsFilter WT Filter setted by the user
     */
    getMaterialDefinitions(workCellsFilter: Filter[], workUnitsFilter: Filter[]) : Observable<IMaterial[]>
    {
        let observer = new Observable<IMaterial[]>(observer => {

            // Send empty value to clean previos data (if any)
            observer.next([]);

            setTimeout(()=>{
                let oData : IMaterial[] = [];

                for(let i = 0; i < 10; i++)
                {
                    oData.push({
                        MaterialDefinitionId : "Mat" + i,
                        S95Id : "S95ID_" + i
                    })
                }

                observer.error();

                observer.next(oData);
                observer.complete();
            }, 1000)
        });
        return observer;
    }
    /**
     * Retrieve all rule types
     */
    getRuleTypes(): Observable<string[]>
    {
        let observer = new Observable<string[]>(observer => {

            // Send empty value to clean previos data (if any)
            observer.next([]);

            setTimeout(()=>{
                let oData : string[] = [
                    "Counter",
                    "Timing",
                    "Event"
                ];

                observer.next(oData);
                observer.complete();
            }, 1000)
        });
        return observer;
    }

}