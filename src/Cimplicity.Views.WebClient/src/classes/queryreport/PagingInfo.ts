module ge.cim.queryreport {
    export class PagingInfo {
        constructor(pageNumber: number, pageSize: number) {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
        }
        PageNumber: number;
        PageSize: number;
    }

}