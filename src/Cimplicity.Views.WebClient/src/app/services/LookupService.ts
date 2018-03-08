import { Injectable } from "@angular/core";
import { Http, RequestOptions, Response, Headers } from '@angular/http';

import { HttpBaseService } from "./base/HttpBaseService";

import { Observable, Subscriber } from "rxjs/Rx";

import Filter = ge.cim.models.Filter;

/* ---- VIEWMODELS ----- */
import IProductionLine = ge.cim.IProductionLine;
import IWorkUnit = ge.cim.IWorkUnit;
import IWorkCell = ge.cim.IWorkCell;
import IBaseServerResponse = ge.cim.IBaseServerResponse;
import IMaterial = ge.cim.IMaterial;
/* ---------------- */



/**
 * Define the class use to performs request to Lookup Service
 */
@Injectable()
export class LookupService {
    constructor(protected http: HttpBaseService) {

    }
    /**
     * Retrieve the List of the Production Lines associated to the Work Area
     * @param workArea workArea for which looking for production lines
     */
    getProductionLines(workArea: string): Observable<IProductionLine[]> {
        let observer = new Observable<IProductionLine[]>(observer => {

            this.http.get(`lookup/getproductionlinesfortest?workArea=${workArea}`)
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as IProductionLine[]);
                    observer.complete();
                });
        });
        return observer;
    }
    /**
     * Retrieve the List of the Work Cells associated to the Production Lines
     * @param productionLinesFilter Filter setted by the user
     */
    getWorkCells(productionLinesFilter: Filter[]): Observable<IWorkCell[]> {
        let observer = new Observable<IWorkCell[]>(observer => {

            //Map filters to object claimed by the service
            let productionLines = this.mapFiltersTo<IProductionLine>(productionLinesFilter,
                (f: Filter) => { return { DisplayName: f._sCaption, S95Id: f._oValue } as IProductionLine })

            this.http.postJson("lookup/getworkcells", productionLines)
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as IWorkCell[]);
                    observer.complete();
                });

        });
        return observer;
    }
    /**
     * Retrieve the List of the Work Units associated to the Work cells
     * @param workCellsFilter Filter setted by the user
     */
    getWorkUnits(workCellsFilter: Filter[]): Observable<IWorkUnit[]> {
        let observer = new Observable<IWorkUnit[]>(observer => {

            //Map filters to object claimed by the service
            let workCells = this.mapFiltersTo<IWorkCell>(workCellsFilter,
                (f: Filter) => { return { DisplayName: f._sCaption, S95Id: f._oValue } as IWorkCell });


            this.http.postJson("lookup/getworkunits", workCells)
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as IWorkUnit[]);
                    observer.complete();
                });

        });
        return observer;
    }
     /**
     * Retrieve the List of the material definitions associated to the choosen workCells and workUnits
     * @param workCellsFilter WL Filter setted by the user
     * @param workUnitsFilter WT Filter setted by the user
     */
    getMaterialDefinitions(workCellsFilter: Filter[], workUnitsFilter: Filter[]) : Observable<IMaterial[]> {
        let observer = new Observable<IMaterial[]>(observer => {

            //Map filters to object claimed by the service
            let workCells = this.mapFiltersTo<IWorkCell>(workCellsFilter,
                (f: Filter) => { return { DisplayName: f._sCaption, S95Id: f._oValue } as IWorkCell })

            //Map filters to object claimed by the service
            let workUnits = this.mapFiltersTo<IWorkUnit>(workUnitsFilter,
                (f: Filter) => { return { DisplayName: f._sCaption, S95Id: f._oValue } as IWorkUnit })

            //Wrapping objects in one to pass them to the service
            this.http.postJson("lookup/getmaterialdefinitions", { workCells: workCells, workUnits: workUnits })
                .map((rsp: Response) => rsp.json() as IBaseServerResponse)
                .catch(err => {
                    observer.error(err.json() || err);
                    return Observable.of(false);
                })
                .subscribe((rsp: IBaseServerResponse) => {
                    observer.next(rsp.Result as IMaterial[]);
                    observer.complete();
                });

        });
        return observer;
    }


    private mapFiltersTo<TType>(filter: Filter[], mapFunc: Function): TType[] {
        let toReturn: TType[] = filter.map(f => { return mapFunc(f); });
        return toReturn;
    }
}

