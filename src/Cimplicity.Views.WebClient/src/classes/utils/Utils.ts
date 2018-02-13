///<reference path="../../../typings/index.d.ts"/>

/// <reference path="CookieManager.ts"/>
module jsutils
{
    import CookieManager = ge.CookieManager;
    export class Utils
    {
        public static isNumber(oValue)
        {
            return (isNaN(oValue) == false);
        }


        public static isArrayEmpty(aoArray:any[])
        {
            if(Utils.isNullOrUndef(aoArray) == true){
                return true;
            }
            return (aoArray.length == 0);
        }

        public static deleteObjectProperty(oObject:any, sKey:string)
        {
            if( Utils.hasKey(oObject, sKey) == true) {
                delete oObject[sKey];
            }
            return oObject;
        }



        /**
         * Delete string character at specific position
         * @param sStr The string
         * @param iPos The char position in the string (0-based)
         * @return {string} The string with char removed
         */
        public static strDeleteChartAt(sStr:string, iPos:number)
        {
            return sStr.slice(0, iPos) + sStr.slice(iPos+1);
        }

        /**
         * Delete the first char of a string
         * @param sStr The string
         * @return {string} The string without the first char
         */
        public static strDeleteFirstChar(sStr:string)
        {
            return Utils.strDeleteChartAt(sStr, 0);
        }

        /**
         * Set a property of an object if it has not been already set before
         * @param oObject The object which will store property
         * @param sPropertyName The name of the property
         * @param oValue The value of the property if not already set
         */
        public static setObjectPropertyIfNotSet(oObject, sPropertyName, oValue)
        {
            if( Utils.isNullOrUndef(oObject[sPropertyName]) == true){
                oObject[sPropertyName] = oValue;
            }
        }

        /**
         * Set a property of an object if it has not been already set before
         * @param oObject The object which will store property
         * @param sPropertyName The name of the property
         * @param oDefaultValue The value of the property if not already set
         */
        public static getObjectProperty(oObject, sPropertyName, oDefaultValue)
        {
            if( Utils.isNullOrUndef(oObject[sPropertyName]) == false){
                return oObject[sPropertyName];
            }else{
                return oDefaultValue;
            }
        }

        /**
         * Get JSON property/field or return a default value if does not exist
         * @param oJson The JSON object
         * @param sName The property/field name
         * @param oValueIfNotSet The value to return if property/field does not exist in JSON
         * @returns {any} The JSON property/field or default value if does not exist
         */
        public static getJsonValue(oJson, sName:string, oValueIfNotSet:any)
        {
            if(oJson[sName] != null && oJson[sName] != "undefined") {
                return oJson[sName];
            }
            else {
                return oValueIfNotSet;
            }
        }

        /**
         * Turn first letter of string uppercased
         * @param sString
         * @returns {string}
         */
        public static capitalizeFirstLetter(sString:string)
        {
            return sString.charAt(0).toUpperCase() + sString.slice(1);
        }

        public static findWithAttr(array, attr, value) {
            for(var i = 0; i < array.length; i += 1) {
                if(array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        }


        public static isJsonValid(oJson)
        {
            return (oJson != null && oJson != undefined);
        }

        /**
         * Set return the given value if not NULL or Default value otherwise
         * @param oVal The value
         * @param oDefaultVal The default value
         * @returns {boolean} The 'oVal' is it is not NULL or Undefined, 'oDefaultVal' otherwise
         */
        public static setOptionalComponentBindingsIfNullOrUndefined(oVal, oDefaultVal)
        {
            if( Utils.isNullOrUndef(oVal) == true )
            {
                oVal = oDefaultVal;
            }
            return oVal;
        }

        /**
         * Check if a variable is NULL or 'undefined'
         * @param oVal
         * @returns {boolean} TRUE if supplied param is NULL or undefined, FALSE otherwise
         */
        public static isNullOrUndef(oVal)
        {
            return ( oVal == null || oVal == undefined);

        }

        /**
         * Scroll HTML page to specific HTML element
         * @param oJqueryElem The HTML element as jQuery object
         * @param iVerticalOffset Scroll offset
         */
        public static scrollTo(oJqueryElem:JQuery, iVerticalOffset:number = 0)
        {
            //$("#elementtoScrollToID")
            $('html, body').animate({
                scrollTop: (oJqueryElem.offset().top + iVerticalOffset)
            }, 500);
        }

        /**
         * Remove an item from array at given position
         * @param oArray The array to remove item from
         * @param iIndex The item index
         * @returns {any[]} The removed item, or NULL if no item removed
         */
        public static removeFromArray(oArray:any[], iIndex):any[]
        {
            return oArray.splice(iIndex, 1);
        }

        /**
         * Get the position of an object into an array, or -1 if the array does not
         * have that object inside
         * @param oArray The array to search into
         * @param oObject The object to search
         * @param oCompareBy [Optional] how to compare objects. The preferable way is with function, otherwise specify object field
         * @returns {number} The object position if object is in the array, -1 otherwise
         */
        public static arrayIndexOf(oArray:any[], oObject:any, oCompareBy:any = null):number
        {
            for(var i = 0; i < oArray.length; i++)
            {
                if( oCompareBy != null)
                {
                    // Preferable way
                    if( Utils.isFunction(oCompareBy) == true)
                    {
                        if( oCompareBy(oArray[i], oObject) == true)
                        {
                            return i;
                        }
                    }
                    else
                    {
                        if( Utils.isString(oObject) == true){
                            // Type string
                            if(oArray[i][oCompareBy] == oObject){ return i;}
                        }
                        else{
                            if( oArray[i][oCompareBy] == oObject[oCompareBy] ){ return i; }
                        }
                    }

                }
                else{
                    if( oArray[i] == oObject )
                    {
                        return i;
                    }
                }
            }

            return -1;
        }

        /**
         * Check if an array contains a given object
         * @param oArray The array to search into
         * @param oObject The object to search
         * @param sCompareField [Optional] the object field used to compare array objects and searched object
         * @returns {boolean} TRUE if the array contains object, FALSE otherwise
         */
        public static arrayContains(oArray, oObject, sCompareField = null):boolean
        {
            return ( Utils.arrayIndexOf(oArray, oObject, sCompareField) >= 0 );
        }

        /**
         * Add an element to an array ONLY IF the elements does not exist in the array
         * @param oArray The array you want to put element into
         * @param oObject The object to put into array
         * @param sCompareField Object property used by 'compare two element' function
         * @return {boolean} TRUE if the element has been added, FALSE otherwise
         */
        public static addElementToArrayIfNotContained(oArray, oObject, sCompareField = null) : boolean
        {
            if( Utils.arrayContains(oArray, oObject, sCompareField) == false ){
                oArray.push(oObject);
                return true;
            }
            return false
        }



        public static initializeVarIfUndefined(oVar, oDefaultVal) : number
        {
            if( oVar == undefined)
                oVar = oDefaultVal;

            return oVar;
        }

        public static removeItemFromArray(oArray, oItem, oCompareFunction = null)
        {
            if(Utils.isTrueArray(oArray) == true)
            {
                for(var i = 0; i < oArray.length; i++)
                {
                    if( oCompareFunction != null)
                    {
                        if ( oCompareFunction(oArray[i], oItem) == true) {
                            oArray.splice(i, 1);
                            return;
                        }
                    }
                    else {
                        if (oArray[i] == oItem) {
                            oArray.splice(i, 1);
                            return;
                        }
                    }
                }
            }
            else{
                throw "Cannot remove, array is not a true array";
            }
        }

        public static hasKey(oObject, sKey)
        {
            return (sKey in oObject)
        }

        public static getObjectElement(oObject, sKey, oDefaultValue)
        {
            try {
                if (sKey in oObject) {
                    return oObject[sKey];
                }
            }catch (exception)
            {
            }
            return oDefaultValue;
        }


        public static isBoolean(oValue)
        {
            if( oValue === true || oValue === false )
            {
                return true;
            }
            return false;
        }


        /**
         * Delete an element from array using element index or element object
         * @param aArray
         * @param oObjectOrObjectIndex
         */
        public static deleteElementFromArray(aArray, oObjectOrObjectIndex)
        {
            var iObjectIndex = -1;
            if( Utils.isTrueArray(aArray) == true)
            {
                if( isNaN(oObjectOrObjectIndex) == false) {
                    iObjectIndex = oObjectOrObjectIndex;
                }
                else{
                    for(var i = 0; i < aArray.length; i++)
                    {
                        if( aArray[i] == oObjectOrObjectIndex){
                            iObjectIndex = i;
                            break;
                        }
                    }
                }
            }
            else
            {

                throw "deleteElementFromArray not implemented for associative arrays";
            }

            aArray.splice(iObjectIndex, 1);

        }

        public static strStartsWith(sStr:string, sNeedle:string, position:number=0)
        {
            return sStr.substr(position, sNeedle.length) === sNeedle;
        }

        public static xdateToIso8601String(oXDateObj)
        {
            if( oXDateObj )
                return oXDateObj.toString("u");
            else
                return "";
        }

        // /**
        //  * Check if the current screen is 'small screen'
        //  * NOTE: it requires jQuery and the 3 <div> on the index with classes 'show-small-only', etc
        //  */
        // public static isScreenSmall() {
        //     return ($("#check-for-small-screen").css("display") != "none")
        // }
        // /**
        //  * Check if the current screen is 'small screen'
        //  * NOTE: it requires jQuery and the 3 <div> on the index with classes 'show-small-only', etc
        //  */
        // public static isScreenMedium() {
        //     return ($("#check-for-mid-screen").css("display") != "none")
        // }
        // /**
        //  * Check if the current screen is 'small screen'
        //  * NOTE: it requires jQuery and the 3 <div> on the index with classes 'show-small-only', etc
        //  */
        // public static isScreenLarge() {
        //     return ($("#check-for-large-screen").css("display") != "none")
        // }
        //
        // public static isEmail(sValue)
        // {
        //     if( Utils.isStrNullOrEmpty( sValue) )
        //         return false;
        //
        //     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(sValue);
        // }

        public static isPhoneNumber(sValue)
        {
            if( Utils.isStrNullOrEmpty( sValue) )
                return false;

            var i;
            for(i = 0; i < sValue.length; i++)
            {
                var char = sValue.charAt(i);
                if( i == 0)
                {
                    if(  char != '+' && Utils.isNumeric(char) == false )
                    {
                        return false
                    }
                }
                else
                {
                    if( Utils.isNumeric(char) == false)
                    {
                        return false
                    }
                }
            }

            // at least 10 digits
            if( i >= 10)
            {
                return true;
            }
            else
                return false;


        }

        /**
         * Check if the given string lenght is at least the given length
         * @param sValue The string to check
         * @param iMinLength The min lenght
         * @returns {boolean} TRUE if string length is >= min length, FALSE otherwise or if not a string
         */
        public static isStringLengthMinMax(sValue:string, iMinLength:number, iMaxLength:number)
        {
            if( Utils.isStrNullOrEmpty(sValue) == false)
                return (sValue.length >= iMinLength) && (sValue.length <= iMaxLength);
            else
                return false
        }

        /**
         * Check if the given string lenght is at least the given length
         * @param sValue The string to check
         * @param iMinLength The min lenght
         * @returns {boolean} TRUE if string length is >= min length, FALSE otherwise or if not a string
         */
        public static isStringMinLenght(sValue, iMinLength)
        {
            if( Utils.isStrNullOrEmpty(sValue) == false)
                return sValue.length >= iMinLength;
            else
                return false
        }

        public static clearArray(aArray:any[])
        {
            if (Array.isArray(aArray)) {
                if (Utils.isTrueArray(aArray) == true) {
                    aArray.splice(0, aArray.length);
                }
                else if (typeof aArray == "object") {
                    for (var key in aArray) {
                        delete aArray[key];
                    }
                }
                else
                    throw ("Cannot empty the array:");//, aArray);
            }
            else
                throw ("Cannot empty because is not an array");//, aArray);
        }
        public static clearObject(oObject:any)
        {
            if (typeof oObject == "object") {
                for (var key in oObject) {
                    delete oObject[key];
                }
            }
        }


        public static isFunction(oObject)
        {
            return (typeof oObject == "function");
        }

        /**
         * Check if the parameter is a 'true' array or not.
         * A 'true array' is a standard array with numbers as index
         * and NOT something similar to an associative array
         * @param obj The object to test
         * @returns {boolean} TRUE if it's a 'true' array, FALSE otherwise
         */
        public static isTrueArray(obj)
        {
            // if param is null/undef return FALSE
            if (!obj) { return false; }
            try
            {
                if (!(obj.propertyIsEnumerable("length")) && (typeof obj === "object") && (typeof obj.length === "number"))
                {
                    // Now check all indices of the array are numeric
                    for (var index in obj)
                    {
                        if ( Utils.isNumeric(index) == false){
                            return false;
                        }
                    } // for (var index in object)
                    return true;
                }
                else
                {
                    return false;
                } // if (!(obj.propertyIsEnumerable("length"))...
            }
            catch (e)
            {
                return false;
            } // try
        }

        public static isNumeric(obj)
        {
            try {
                return (((obj - 0) == obj) && (obj.length > 0));
            } catch (e) {
                return false;
            } // try
        } // isNumeric()


        public static strContainsCaseInsensitive(sSource : string, sStrToSearch : string)
        {
            var s1 = sSource.toLowerCase();
            var s2 = sStrToSearch.toLowerCase();
            return (s1.indexOf(s2) > -1);
        }

        public static strContains(sSource : string, sStrToSearch)
        {
            return (sSource.indexOf(sStrToSearch) > -1);
        }
        public static strContainsNoCase(sSource : string, sStrToSearch)
        {
            return (sSource.toLocaleLowerCase().indexOf(sStrToSearch.toLocaleLowerCase()) > -1);
        }

        /**
         * Check if the given object is string or not
         * @param oVal Object to check
         * @returns {boolean} TRUE if object is a string, FALSE otherwise
         */
        public static isString(oVal:any)
        {
            return (typeof oVal == 'string');
        }

        public static isStrNullOrEmpty(sString : string)
        {
            if( sString && typeof sString != 'string')
            {
                throw "[Utils.isStrNullOrEmpty] The value is NOT a string";
                //return true;
            }

            if( sString && sString.length > 0)
                return false; // string has content
            else
                return true; // string is empty or null
        }

        public static getLoggedUsername()
        {
            return CookieManager.getLoggedUser();
        }



        public static detectIE()
        {
            var ua = window.navigator.userAgent;
            var isIe = false;
            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                isIe = true;
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                isIe = true;
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                isIe = true;
            }


            // other browser
            return isIe;
        }

        public static showIEAlertMessage(){
            if(Utils.detectIE() && $('.ie-alert').length == 0){
                let template = '<div class="alert alert-danger alert-dismissable ie-alert" role="alert" ng-if="$ctrl.isIE()">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                    'For a better experience use Mozilla Firefox. Thank you.' +
                    '</div>';
                $('body').append(template);
            }
        }

        /**
         * Round the two extremes of an interval to match desired
         * number format (for example 1'234 --> 1'000)
         * @param {type} min
         * @param {type} max
         * @returns {type} the 'floor' value of the initial value
         */
        public static floorToMultipleOfFive(value) {
            if( isNaN(value) )
                return value;

            var digitsToUse = value.toString().length;
            // Round value to it's 'floor'
            if (digitsToUse > 2) {
                value = Math.floor(value / Math.pow(10, digitsToUse - 2));
                while (value % 5 != 0) {
                    value--;
                }
                value *= Math.pow(10, digitsToUse - 2)
            }
            return value;
        }

        public static ceilToMultipleOfFive(value)
        {
            if( isNaN(value) )
                return value;

            var digitsToUse = value.toString().length;
            if( digitsToUse > 2)
            {
                value = Math.ceil(value / Math.pow(10, digitsToUse - 2));
                while( value % 5 != 0)
                {
                    value++;
                }
                value *= Math.pow(10, digitsToUse - 2)
            }

            return value;
        }

        public static getRandomInt(min, max)
        {
            return Math.round( (Math.random() * (max-min)) + min);
        }

        public static setFooterVersionNumber(versionNumber : string)
        {
            let div = $('footer #version-number');
            if(versionNumber.indexOf('beta') !== -1){
                div.addClass('betaversion');
            }
            div.html("SC Hotspot - " + versionNumber);
        }

    }
}
