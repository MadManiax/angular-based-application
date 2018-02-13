var jsutils;
(function (jsutils) {
    var CookieManager = ge.CookieManager;
    var Utils = (function () {
        function Utils() {
        }
        Utils.isNumber = function (oValue) {
            return (isNaN(oValue) == false);
        };
        Utils.isArrayEmpty = function (aoArray) {
            if (Utils.isNullOrUndef(aoArray) == true) {
                return true;
            }
            return (aoArray.length == 0);
        };
        Utils.deleteObjectProperty = function (oObject, sKey) {
            if (Utils.hasKey(oObject, sKey) == true) {
                delete oObject[sKey];
            }
            return oObject;
        };
        Utils.strDeleteChartAt = function (sStr, iPos) {
            return sStr.slice(0, iPos) + sStr.slice(iPos + 1);
        };
        Utils.strDeleteFirstChar = function (sStr) {
            return Utils.strDeleteChartAt(sStr, 0);
        };
        Utils.setObjectPropertyIfNotSet = function (oObject, sPropertyName, oValue) {
            if (Utils.isNullOrUndef(oObject[sPropertyName]) == true) {
                oObject[sPropertyName] = oValue;
            }
        };
        Utils.getObjectProperty = function (oObject, sPropertyName, oDefaultValue) {
            if (Utils.isNullOrUndef(oObject[sPropertyName]) == false) {
                return oObject[sPropertyName];
            }
            else {
                return oDefaultValue;
            }
        };
        Utils.getJsonValue = function (oJson, sName, oValueIfNotSet) {
            if (oJson[sName] != null && oJson[sName] != "undefined") {
                return oJson[sName];
            }
            else {
                return oValueIfNotSet;
            }
        };
        Utils.capitalizeFirstLetter = function (sString) {
            return sString.charAt(0).toUpperCase() + sString.slice(1);
        };
        Utils.findWithAttr = function (array, attr, value) {
            for (var i = 0; i < array.length; i += 1) {
                if (array[i][attr] === value) {
                    return i;
                }
            }
            return -1;
        };
        Utils.isJsonValid = function (oJson) {
            return (oJson != null && oJson != undefined);
        };
        Utils.setOptionalComponentBindingsIfNullOrUndefined = function (oVal, oDefaultVal) {
            if (Utils.isNullOrUndef(oVal) == true) {
                oVal = oDefaultVal;
            }
            return oVal;
        };
        Utils.isNullOrUndef = function (oVal) {
            return (oVal == null || oVal == undefined);
        };
        Utils.scrollTo = function (oJqueryElem, iVerticalOffset) {
            if (iVerticalOffset === void 0) { iVerticalOffset = 0; }
            $('html, body').animate({
                scrollTop: (oJqueryElem.offset().top + iVerticalOffset)
            }, 500);
        };
        Utils.removeFromArray = function (oArray, iIndex) {
            return oArray.splice(iIndex, 1);
        };
        Utils.arrayIndexOf = function (oArray, oObject, oCompareBy) {
            if (oCompareBy === void 0) { oCompareBy = null; }
            for (var i = 0; i < oArray.length; i++) {
                if (oCompareBy != null) {
                    if (Utils.isFunction(oCompareBy) == true) {
                        if (oCompareBy(oArray[i], oObject) == true) {
                            return i;
                        }
                    }
                    else {
                        if (Utils.isString(oObject) == true) {
                            if (oArray[i][oCompareBy] == oObject) {
                                return i;
                            }
                        }
                        else {
                            if (oArray[i][oCompareBy] == oObject[oCompareBy]) {
                                return i;
                            }
                        }
                    }
                }
                else {
                    if (oArray[i] == oObject) {
                        return i;
                    }
                }
            }
            return -1;
        };
        Utils.arrayContains = function (oArray, oObject, sCompareField) {
            if (sCompareField === void 0) { sCompareField = null; }
            return (Utils.arrayIndexOf(oArray, oObject, sCompareField) >= 0);
        };
        Utils.addElementToArrayIfNotContained = function (oArray, oObject, sCompareField) {
            if (sCompareField === void 0) { sCompareField = null; }
            if (Utils.arrayContains(oArray, oObject, sCompareField) == false) {
                oArray.push(oObject);
                return true;
            }
            return false;
        };
        Utils.initializeVarIfUndefined = function (oVar, oDefaultVal) {
            if (oVar == undefined)
                oVar = oDefaultVal;
            return oVar;
        };
        Utils.removeItemFromArray = function (oArray, oItem, oCompareFunction) {
            if (oCompareFunction === void 0) { oCompareFunction = null; }
            if (Utils.isTrueArray(oArray) == true) {
                for (var i = 0; i < oArray.length; i++) {
                    if (oCompareFunction != null) {
                        if (oCompareFunction(oArray[i], oItem) == true) {
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
            else {
                throw "Cannot remove, array is not a true array";
            }
        };
        Utils.hasKey = function (oObject, sKey) {
            return (sKey in oObject);
        };
        Utils.getObjectElement = function (oObject, sKey, oDefaultValue) {
            try {
                if (sKey in oObject) {
                    return oObject[sKey];
                }
            }
            catch (exception) {
            }
            return oDefaultValue;
        };
        Utils.isBoolean = function (oValue) {
            if (oValue === true || oValue === false) {
                return true;
            }
            return false;
        };
        Utils.deleteElementFromArray = function (aArray, oObjectOrObjectIndex) {
            var iObjectIndex = -1;
            if (Utils.isTrueArray(aArray) == true) {
                if (isNaN(oObjectOrObjectIndex) == false) {
                    iObjectIndex = oObjectOrObjectIndex;
                }
                else {
                    for (var i = 0; i < aArray.length; i++) {
                        if (aArray[i] == oObjectOrObjectIndex) {
                            iObjectIndex = i;
                            break;
                        }
                    }
                }
            }
            else {
                throw "deleteElementFromArray not implemented for associative arrays";
            }
            aArray.splice(iObjectIndex, 1);
        };
        Utils.strStartsWith = function (sStr, sNeedle, position) {
            if (position === void 0) { position = 0; }
            return sStr.substr(position, sNeedle.length) === sNeedle;
        };
        Utils.xdateToIso8601String = function (oXDateObj) {
            if (oXDateObj)
                return oXDateObj.toString("u");
            else
                return "";
        };
        Utils.isPhoneNumber = function (sValue) {
            if (Utils.isStrNullOrEmpty(sValue))
                return false;
            var i;
            for (i = 0; i < sValue.length; i++) {
                var char = sValue.charAt(i);
                if (i == 0) {
                    if (char != '+' && Utils.isNumeric(char) == false) {
                        return false;
                    }
                }
                else {
                    if (Utils.isNumeric(char) == false) {
                        return false;
                    }
                }
            }
            if (i >= 10) {
                return true;
            }
            else
                return false;
        };
        Utils.isStringLengthMinMax = function (sValue, iMinLength, iMaxLength) {
            if (Utils.isStrNullOrEmpty(sValue) == false)
                return (sValue.length >= iMinLength) && (sValue.length <= iMaxLength);
            else
                return false;
        };
        Utils.isStringMinLenght = function (sValue, iMinLength) {
            if (Utils.isStrNullOrEmpty(sValue) == false)
                return sValue.length >= iMinLength;
            else
                return false;
        };
        Utils.clearArray = function (aArray) {
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
                    throw ("Cannot empty the array:");
            }
            else
                throw ("Cannot empty because is not an array");
        };
        Utils.clearObject = function (oObject) {
            if (typeof oObject == "object") {
                for (var key in oObject) {
                    delete oObject[key];
                }
            }
        };
        Utils.isFunction = function (oObject) {
            return (typeof oObject == "function");
        };
        Utils.isTrueArray = function (obj) {
            if (!obj) {
                return false;
            }
            try {
                if (!(obj.propertyIsEnumerable("length")) && (typeof obj === "object") && (typeof obj.length === "number")) {
                    for (var index in obj) {
                        if (Utils.isNumeric(index) == false) {
                            return false;
                        }
                    }
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        };
        Utils.isNumeric = function (obj) {
            try {
                return (((obj - 0) == obj) && (obj.length > 0));
            }
            catch (e) {
                return false;
            }
        };
        Utils.strContainsCaseInsensitive = function (sSource, sStrToSearch) {
            var s1 = sSource.toLowerCase();
            var s2 = sStrToSearch.toLowerCase();
            return (s1.indexOf(s2) > -1);
        };
        Utils.strContains = function (sSource, sStrToSearch) {
            return (sSource.indexOf(sStrToSearch) > -1);
        };
        Utils.strContainsNoCase = function (sSource, sStrToSearch) {
            return (sSource.toLocaleLowerCase().indexOf(sStrToSearch.toLocaleLowerCase()) > -1);
        };
        Utils.isString = function (oVal) {
            return (typeof oVal == 'string');
        };
        Utils.isStrNullOrEmpty = function (sString) {
            if (sString && typeof sString != 'string') {
                throw "[Utils.isStrNullOrEmpty] The value is NOT a string";
            }
            if (sString && sString.length > 0)
                return false;
            else
                return true;
        };
        Utils.getLoggedUsername = function () {
            return CookieManager.getLoggedUser();
        };
        Utils.detectIE = function () {
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
            return isIe;
        };
        Utils.showIEAlertMessage = function () {
            if (Utils.detectIE() && $('.ie-alert').length == 0) {
                var template = '<div class="alert alert-danger alert-dismissable ie-alert" role="alert" ng-if="$ctrl.isIE()">' +
                    '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
                    'For a better experience use Mozilla Firefox. Thank you.' +
                    '</div>';
                $('body').append(template);
            }
        };
        Utils.floorToMultipleOfFive = function (value) {
            if (isNaN(value))
                return value;
            var digitsToUse = value.toString().length;
            if (digitsToUse > 2) {
                value = Math.floor(value / Math.pow(10, digitsToUse - 2));
                while (value % 5 != 0) {
                    value--;
                }
                value *= Math.pow(10, digitsToUse - 2);
            }
            return value;
        };
        Utils.ceilToMultipleOfFive = function (value) {
            if (isNaN(value))
                return value;
            var digitsToUse = value.toString().length;
            if (digitsToUse > 2) {
                value = Math.ceil(value / Math.pow(10, digitsToUse - 2));
                while (value % 5 != 0) {
                    value++;
                }
                value *= Math.pow(10, digitsToUse - 2);
            }
            return value;
        };
        Utils.getRandomInt = function (min, max) {
            return Math.round((Math.random() * (max - min)) + min);
        };
        Utils.setFooterVersionNumber = function (versionNumber) {
            var div = $('footer #version-number');
            if (versionNumber.indexOf('beta') !== -1) {
                div.addClass('betaversion');
            }
            div.html("SC Hotspot - " + versionNumber);
        };
        return Utils;
    }());
    jsutils.Utils = Utils;
})(jsutils || (jsutils = {}));
//# sourceMappingURL=Utils.js.map