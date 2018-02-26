import {Pipe, PipeTransform} from '@angular/core';
import Utils = jsutils.Utils;

@Pipe({
    name: 'dropdownOptionSearch',
    pure: false
})
export class DropdownOptionSearchPipe implements PipeTransform
{
    constructor()
    {
    }

    transform(aoOptions: any[], sTextFilter: string, sOptionCaptionPropertyName:string): any[]
    {
        if (!aoOptions || !sTextFilter)
        {
            return aoOptions;
        }
        // sTextFilter aoOptions array, aoOptions which match and return true will be kept, false will be filtered out
        return aoOptions.filter((item: any) => {
            return this.applyFilter(item, sTextFilter, sOptionCaptionPropertyName);
        });
    }


    /**
     * Perform the filtering.
     *
     * @param {any} oOption The 'dropdown option' to compare to the filter.
     * @param {string} sTextFilter The filter to apply.
     * @param {string} sOptionCaptionPropertyName The name of the 'option object' property which is used as 'option caption'
     * @return {boolean} TRUE if option satisfies filters, FALSE if not.
     */
    applyFilter(oOption: any, sTextFilter: string, sOptionCaptionPropertyName:string): boolean
    {
        try{
            let sCaption = oOption[sOptionCaptionPropertyName];
            if( Utils.isStrNullOrEmpty(sCaption) == false )
            {
                return Utils.strContainsCaseInsensitive(sCaption, sTextFilter);
            }
            return false;
        }
        catch (e)
        {
            return false;
        }
        // for (let field in sTextFilter)
        // {
        //     if (sTextFilter[field])
        //     {
        //         if (typeof sTextFilter[field] === 'string')
        //         {
        //             if (oOption[field].toLowerCase().indexOf(sTextFilter[field].toLowerCase()) === -1)
        //             {
        //                 return false;
        //             }
        //         } else if (typeof sTextFilter[field] === 'number')
        //         {
        //             if (oOption[field] !== sTextFilter[field])
        //             {
        //                 return false;
        //             }
        //         }
        //     }
        // }
        // return true;
    }

}