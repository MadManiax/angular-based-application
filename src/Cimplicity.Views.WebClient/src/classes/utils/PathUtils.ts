///<reference path="Utils.ts"/>
/**
 * Created by Daniele Fiori
 */


module jsutils
{
    import Utils = jsutils.Utils;

    export class FileUtils
    {
        private static EXTENSION_SEPARATOR = '.';

        public static getExtension(sFilename:string)
        {
            let oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);
            return oTmp[oTmp.length - 1];
        }
        public static removeExtension(sFilename:string, asExtensionsFilter : string[] = null)
        {
            let oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);

            if( Utils.isNullOrUndef(asExtensionsFilter) == true) {
                // Remove any extension
                Utils.removeFromArray(oTmp, oTmp.length - 1);
            }
            else
            {
                // Search for specific extensions and remove only if found
                let sFileExtension = FileUtils.getExtension(sFilename);
                for(let i = 0; i < asExtensionsFilter.length; i++)
                {
                    if( sFileExtension == asExtensionsFilter[i])
                    {
                        Utils.removeFromArray(oTmp, oTmp.length - 1);
                        break;
                    }
                }
            }

            return oTmp.join(FileUtils.EXTENSION_SEPARATOR);
        }
        public static replaceExtension(sFilename:string, sNewExtension:string)
        {
            sNewExtension = sNewExtension.replace(FileUtils.EXTENSION_SEPARATOR, "");

            let oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);
            oTmp[oTmp.length - 1] = sNewExtension;
            return oTmp.join(FileUtils.EXTENSION_SEPARATOR);
        }
    }

    export class PathUtils
    {
        private static PATH_SEPARATOR = "/";

        public static removeFirstAndLastSlashes(sPath:string)
        {
            return sPath.replace(/^\/+|\/+$/g, '')
        }

        /**
         * Combine multiple paths into single string with the complete path
         * @param aoParts Path parts. Can be single dir name, string with a path, array with both of previous data
         * @param bIsServerAbsolute If TRUE the path will be prefixed with '/' to point at website root
         * @return {string} The complete path obtained from join parts with '/'
         */
        public static combine(aoParts:any[], bIsServerAbsolute:boolean=false)
        {
            let sRetval =  ""
            for(let i = 0; i < aoParts.length; i++)
            {
                let sPart = "";
                let oPart = aoParts[i];
                if(Utils.isString(oPart) == true)
                {
                    sPart = PathUtils.removeFirstAndLastSlashes(oPart);
                }
                else if(Utils.isTrueArray(oPart) == true)
                {
                    sPart = PathUtils.combine(oPart);
                }

                if( Utils.isStrNullOrEmpty(sPart) == false)
                {
                    if (i == 0) {
                        sRetval = sPart;
                    }
                    else {
                        sRetval += PathUtils.PATH_SEPARATOR + sPart;
                    }
                }
            }

            if(bIsServerAbsolute == true)
            {
                sRetval = PathUtils.PATH_SEPARATOR + sRetval;
            }

            //console.debug("Resource URL:" + sRetval);

            return sRetval;
        }
    }
}