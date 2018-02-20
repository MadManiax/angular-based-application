var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var Rule = (function () {
                function Rule() {
                }
                Object.defineProperty(Rule.prototype, "WorkCell", {
                    get: function () {
                        return this._WorkCell;
                    },
                    set: function (value) {
                        this._WorkCell = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "WorkUnit", {
                    get: function () {
                        return this._WorkUnit;
                    },
                    set: function (value) {
                        this._WorkUnit = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "Actual", {
                    get: function () {
                        return this._Actual;
                    },
                    set: function (value) {
                        this._Actual = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "Remaining", {
                    get: function () {
                        return this._Remaining;
                    },
                    set: function (value) {
                        this._Remaining = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "Set", {
                    get: function () {
                        return this._Set;
                    },
                    set: function (value) {
                        this._Set = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "OverflowRemaining", {
                    get: function () {
                        return this._OverflowRemaining;
                    },
                    set: function (value) {
                        this._OverflowRemaining = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "OverflowSet", {
                    get: function () {
                        return this._OverflowSet;
                    },
                    set: function (value) {
                        this._OverflowSet = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Rule.prototype, "Name", {
                    get: function () {
                        return this._Name;
                    },
                    set: function (value) {
                        this._Name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Rule.JSON_FIELD_WORK_CELL = "WorkCell";
                return Rule;
            }());
            models.Rule = Rule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var CounterRule = (function (_super) {
                __extends(CounterRule, _super);
                function CounterRule() {
                    return _super.call(this) || this;
                }
                CounterRule.prototype.getRemainingToString = function () { return this.Remaining.toString(); };
                CounterRule.prototype.getSetToString = function () { return this.Set.toString(); };
                CounterRule.prototype.getActualToString = function () { return this.Actual.toString(); };
                CounterRule.prototype.getRuleType = function () { return "Counter"; };
                CounterRule.prototype.fillWithDummyData = function (bUseNullWorkUnit, bUseNoOverflow) {
                    if (bUseNullWorkUnit === void 0) { bUseNullWorkUnit = false; }
                    if (bUseNoOverflow === void 0) { bUseNoOverflow = false; }
                    this.WorkCell = "OP" + Math.round(Math.random() * 99);
                    if (bUseNullWorkUnit == false) {
                        this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
                    }
                    else {
                        this.WorkUnit = null;
                    }
                    this.Set = Math.round(Math.random() * 999);
                    do {
                        this.Actual = Math.round(Math.random() * 99);
                    } while (this.Actual > this.Set);
                    this.Remaining = this.Set - this.Actual;
                    this.OverflowSet = Math.round(Math.random() * 99);
                    if (Math.random() > 0.5) {
                        this.OverflowRemaining = Math.round(Math.random() * 10);
                    }
                    else {
                        this.OverflowRemaining = null;
                    }
                    this.Name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum orci ut neque egestas, id maximus arcu interdum. Duis id suscipit mi, id sollicitudin lacus. Proin vitae iaculis leo-" + Math.round(Math.random() * 9999);
                    return this;
                };
                return CounterRule;
            }(models.Rule));
            models.CounterRule = CounterRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var EventRule = (function (_super) {
                __extends(EventRule, _super);
                function EventRule() {
                    return _super.call(this) || this;
                }
                EventRule.prototype.getRemainingToString = function () { return ""; };
                EventRule.prototype.getSetToString = function () { return ""; };
                EventRule.prototype.getActualToString = function () { return ""; };
                EventRule.prototype.getRuleType = function () { return "Event"; };
                EventRule.prototype.fillWithDummyData = function (bUseNullWorkUnit, bUseNoOverflow) {
                    if (bUseNullWorkUnit === void 0) { bUseNullWorkUnit = false; }
                    if (bUseNoOverflow === void 0) { bUseNoOverflow = false; }
                    this.WorkCell = "OP" + Math.round(Math.random() * 99);
                    if (bUseNullWorkUnit == false) {
                        this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
                    }
                    else {
                        this.WorkUnit = null;
                    }
                    this.Set = null;
                    this.Actual = null;
                    this.Remaining = null;
                    this.OverflowSet = Math.round(Math.random() * 99);
                    if (Math.random() > 0.5) {
                        this.OverflowRemaining = Math.round(Math.random() * 10);
                    }
                    else {
                        this.OverflowRemaining = null;
                    }
                    this.Name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum orci ut neque egestas, id maximus arcu interdum. Duis id suscipit mi, id sollicitudin lacus. Proin vitae iaculis leo-" + Math.round(Math.random() * 9999);
                    return this;
                };
                return EventRule;
            }(models.Rule));
            models.EventRule = EventRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var Filter = (function () {
                function Filter() {
                }
                return Filter;
            }());
            models.Filter = Filter;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var Settings = (function () {
                function Settings() {
                }
                return Settings;
            }());
            models.Settings = Settings;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var ReportOverviewSetting = (function (_super) {
                __extends(ReportOverviewSetting, _super);
                function ReportOverviewSetting() {
                    var _this = _super.call(this) || this;
                    _this.sSettingsName = "ReportOverviewSettings";
                    return _this;
                }
                ReportOverviewSetting.createDefault = function () {
                    var oRetval = new ReportOverviewSetting();
                    oRetval._iRowsPerPage = 20;
                    return oRetval;
                };
                Object.defineProperty(ReportOverviewSetting.prototype, "rowsPerPage", {
                    get: function () { return this._iRowsPerPage; },
                    set: function (value) { this._iRowsPerPage = value; },
                    enumerable: true,
                    configurable: true
                });
                return ReportOverviewSetting;
            }(models.Settings));
            models.ReportOverviewSetting = ReportOverviewSetting;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var TableColumn = (function () {
                function TableColumn(sCaption) {
                    if (sCaption === void 0) { sCaption = ""; }
                    this._sCaption = sCaption;
                    this._sCssClasses = "";
                }
                Object.defineProperty(TableColumn.prototype, "caption", {
                    get: function () { return this._sCaption; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TableColumn.prototype, "cssClasses", {
                    get: function () { return this._sCssClasses; },
                    enumerable: true,
                    configurable: true
                });
                TableColumn.prototype.setCssClasses = function (sClasses) { this._sCssClasses = sClasses; return this; };
                return TableColumn;
            }());
            models.TableColumn = TableColumn;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var TimingRule = (function (_super) {
                __extends(TimingRule, _super);
                function TimingRule() {
                    return _super.call(this) || this;
                }
                TimingRule.prototype.calculateRemaining = function () {
                    var oNow = moment();
                    var iDiff = oNow.diff(this._oActualDateTime, "seconds");
                    return this.Set - iDiff;
                };
                TimingRule.prototype.getRemainingToString = function () { return this.Remaining + " sec"; };
                TimingRule.prototype.getSetToString = function () { return this.Set + " sec"; };
                TimingRule.prototype.getActualToString = function () { return this._oActualDateTime.format(TimingRule.DATETIME_FORMAT); };
                TimingRule.prototype.getActualAsDateTime = function () { return this._oActualDateTime; };
                TimingRule.prototype.getRuleType = function () { return "Timing"; };
                TimingRule.prototype.fillWithDummyData = function (bUseNullWorkUnit, bUseNoOverflow) {
                    if (bUseNullWorkUnit === void 0) { bUseNullWorkUnit = false; }
                    if (bUseNoOverflow === void 0) { bUseNoOverflow = false; }
                    this.WorkCell = "ABCDEFGH" + Math.round(Math.random() * 99);
                    if (bUseNullWorkUnit == false) {
                        this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
                    }
                    else {
                        this.WorkUnit = null;
                    }
                    var oNow = moment();
                    this.Set = Math.round(Math.random() * 9999);
                    var iDiffInSeconds = this.Set - Math.round(Math.random() * 999);
                    var oFakeActualDate = moment(oNow).add(-1 * iDiffInSeconds, 'seconds');
                    this.Actual = oFakeActualDate.unix();
                    this._oActualDateTime = moment.unix(this.Actual);
                    this.Remaining = this.calculateRemaining();
                    this.OverflowSet = Math.round(Math.random() * 99);
                    if (Math.random() > 0.5) {
                        this.OverflowRemaining = Math.round(Math.random() * 10);
                    }
                    else {
                        this.OverflowRemaining = null;
                    }
                    this.Name = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum orci ut neque egestas, id maximus arcu interdum. Duis id suscipit mi, id sollicitudin lacus. Proin vitae iaculis leo-" + Math.round(Math.random() * 9999);
                    return this;
                };
                TimingRule.DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
                return TimingRule;
            }(models.Rule));
            models.TimingRule = TimingRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var User = (function () {
                function User(sUserId) {
                    this._sUserId = sUserId;
                }
                Object.defineProperty(User.prototype, "sUserId", {
                    get: function () {
                        return this._sUserId;
                    },
                    set: function (value) {
                        this._sUserId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "sFirstName", {
                    get: function () {
                        return this._sFirstName;
                    },
                    set: function (value) {
                        this._sFirstName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(User.prototype, "sLastName", {
                    get: function () {
                        return this._sLastName;
                    },
                    set: function (value) {
                        this._sLastName = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                return User;
            }());
            models.User = User;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
var ge;
(function (ge) {
    var CookieManager = (function () {
        function CookieManager() {
        }
        CookieManager.saveServerPublicKey = function (sPubKey) {
            CookieManager.setCookie(CookieManager.COOKIES.AUTH_TOKEN, sPubKey, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        };
        CookieManager.getServerPublicKey = function () {
            return CookieManager.getCookie(CookieManager.COOKIES.PUBLIC_KEY);
        };
        CookieManager.getAuthToken = function () {
            return CookieManager.getCookie(CookieManager.COOKIES.AUTH_TOKEN);
        };
        CookieManager.clearAuthToken = function () {
            CookieManager.deleteCookie(CookieManager.COOKIES.AUTH_TOKEN);
        };
        CookieManager.updateAuthToken = function (sAuthToken) {
            CookieManager.setAuthToken(sAuthToken);
        };
        CookieManager.setAuthToken = function (sAuthToken) {
            CookieManager.setCookie(CookieManager.COOKIES.AUTH_TOKEN, sAuthToken, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        };
        CookieManager.isUserLogged = function () {
            return (CookieManager.getLoggedUser() != null);
        };
        CookieManager.getLoggedUser = function () {
            return CookieManager.getCookie(CookieManager.COOKIES.LOGGED_IN);
        };
        CookieManager.setLoggedUser = function (sValue) {
            CookieManager.setCookie(CookieManager.COOKIES.LOGGED_IN, sValue, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        };
        CookieManager.setUserNotLogged = function () {
            CookieManager.deleteCookie(CookieManager.COOKIES.LOGGED_IN);
            CookieManager.deleteCookie(CookieManager.COOKIES.AUTH_TOKEN);
        };
        CookieManager.deleteCookie = function (cname) {
            CookieManager.setCookie(cname, "", -1000);
        };
        CookieManager.setCookie = function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        };
        CookieManager.getCookie = function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ')
                    c = c.substring(1);
                if (c.indexOf(name) == 0)
                    return c.substring(name.length, c.length);
            }
            return null;
        };
        CookieManager.COOKIE_EXPIRE_TIME_DAYS = 1;
        CookieManager.COOKIES = {
            LOGGED_IN: "logged-in",
            AUTH_TOKEN: "authtoken",
            PUBLIC_KEY: "pubkey"
        };
        return CookieManager;
    }());
    ge.CookieManager = CookieManager;
})(ge || (ge = {}));
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
var jsutils;
(function (jsutils) {
    var Utils = jsutils.Utils;
    var FileUtils = (function () {
        function FileUtils() {
        }
        FileUtils.getExtension = function (sFilename) {
            var oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);
            return oTmp[oTmp.length - 1];
        };
        FileUtils.removeExtension = function (sFilename, asExtensionsFilter) {
            if (asExtensionsFilter === void 0) { asExtensionsFilter = null; }
            var oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);
            if (Utils.isNullOrUndef(asExtensionsFilter) == true) {
                Utils.removeFromArray(oTmp, oTmp.length - 1);
            }
            else {
                var sFileExtension = FileUtils.getExtension(sFilename);
                for (var i = 0; i < asExtensionsFilter.length; i++) {
                    if (sFileExtension == asExtensionsFilter[i]) {
                        Utils.removeFromArray(oTmp, oTmp.length - 1);
                        break;
                    }
                }
            }
            return oTmp.join(FileUtils.EXTENSION_SEPARATOR);
        };
        FileUtils.replaceExtension = function (sFilename, sNewExtension) {
            sNewExtension = sNewExtension.replace(FileUtils.EXTENSION_SEPARATOR, "");
            var oTmp = sFilename.split(FileUtils.EXTENSION_SEPARATOR);
            oTmp[oTmp.length - 1] = sNewExtension;
            return oTmp.join(FileUtils.EXTENSION_SEPARATOR);
        };
        FileUtils.EXTENSION_SEPARATOR = '.';
        return FileUtils;
    }());
    jsutils.FileUtils = FileUtils;
    var PathUtils = (function () {
        function PathUtils() {
        }
        PathUtils.removeFirstAndLastSlashes = function (sPath) {
            return sPath.replace(/^\/+|\/+$/g, '');
        };
        PathUtils.combine = function (aoParts, bIsServerAbsolute) {
            if (bIsServerAbsolute === void 0) { bIsServerAbsolute = false; }
            var sRetval = "";
            for (var i = 0; i < aoParts.length; i++) {
                var sPart = "";
                var oPart = aoParts[i];
                if (Utils.isString(oPart) == true) {
                    sPart = PathUtils.removeFirstAndLastSlashes(oPart);
                }
                else if (Utils.isTrueArray(oPart) == true) {
                    sPart = PathUtils.combine(oPart);
                }
                if (Utils.isStrNullOrEmpty(sPart) == false) {
                    if (i == 0) {
                        sRetval = sPart;
                    }
                    else {
                        sRetval += PathUtils.PATH_SEPARATOR + sPart;
                    }
                }
            }
            if (bIsServerAbsolute == true) {
                sRetval = PathUtils.PATH_SEPARATOR + sRetval;
            }
            return sRetval;
        };
        PathUtils.PATH_SEPARATOR = "/";
        return PathUtils;
    }());
    jsutils.PathUtils = PathUtils;
})(jsutils || (jsutils = {}));
var jsutils;
(function (jsutils) {
    var VexUtils = (function () {
        function VexUtils() {
        }
        VexUtils.setDefaultTheme = function (sThemeName) {
            if (sThemeName === void 0) { sThemeName = 'vex-theme-plain'; }
            vex.defaultOptions.className = sThemeName;
        };
        VexUtils.showErrorAlert = function (sMessage) {
            if (sMessage === void 0) { sMessage = null; }
            if (jsutils.Utils.isNullOrUndef(sMessage) == true) {
                sMessage = "An error occurred, please try again later. If error persist contact IT support.";
            }
            var sIcon = "<i class=\"fa fa-exclamation-circle padding-right red-cancel-no-etc-text error\" aria-hidden=\"true\"></i>";
            var sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>Error</span></div><div class='vex-custom-content'>" + sMessage + "</div>";
            var oPromise = new Promise(function (resolve, reject) {
                vex.dialog.alert({
                    unsafeMessage: sHtml,
                    callback: function (value) {
                        resolve(value === true);
                    }
                });
            });
            return oPromise;
        };
        VexUtils.showGeneralAlert = function (sMessage, sTitle, sFaIcon) {
            if (sMessage === void 0) { sMessage = null; }
            if (sTitle === void 0) { sTitle = null; }
            if (sFaIcon === void 0) { sFaIcon = "fa-info-circle"; }
            if (jsutils.Utils.isNullOrUndef(sMessage) == true) {
                sMessage = "";
            }
            var sHtml = "";
            if (jsutils.Utils.isStrNullOrEmpty(sTitle) == false) {
                var sIcon = "<i class=\"fa " + sFaIcon + " padding-right \" aria-hidden=\"true\"></i>";
                sHtml += "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>Error</span></div>";
            }
            sHtml += "<div class='vex-custom-content'>" + sMessage + "</div>";
            var oPromise = new Promise(function (resolve, reject) {
                vex.dialog.alert({
                    unsafeMessage: sHtml,
                    callback: function (value) {
                        resolve(value === true);
                    }
                });
            });
            return oPromise;
        };
        VexUtils.showConfirm = function (sMessage, sTitle, sFaIcon) {
            if (sMessage === void 0) { sMessage = null; }
            if (sTitle === void 0) { sTitle = null; }
            if (sFaIcon === void 0) { sFaIcon = null; }
            if (jsutils.Utils.isNullOrUndef(sMessage) == true) {
                sMessage = "An error occurred, please try again later. If error persist contact IT support.";
            }
            if (jsutils.Utils.isNullOrUndef(sFaIcon) == true) {
                sFaIcon = "fa-question-circle-o";
            }
            var sIcon = "<i class=\"fa " + sFaIcon + " padding-right confirm-dialog-icon\" aria-hidden=\"true\"></i>";
            if (jsutils.Utils.isNullOrUndef(sTitle) == true) {
                sTitle = "";
            }
            var sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>" + sTitle + "</span></div><div class='vex-custom-content'>" + sMessage + "</div>";
            var oPromise = new Promise(function (resolve, reject) {
                vex.dialog.confirm({
                    unsafeMessage: sHtml,
                    callback: function (value) {
                        resolve(value === true);
                    }
                });
            });
            return oPromise;
        };
        VexUtils.showEnterData = function (sMessage, sPlaceholder, sTitle, sFaIcon) {
            if (sMessage === void 0) { sMessage = null; }
            if (sPlaceholder === void 0) { sPlaceholder = ""; }
            if (sTitle === void 0) { sTitle = null; }
            if (sFaIcon === void 0) { sFaIcon = null; }
            return VexUtils.showPrompt(sMessage, sPlaceholder, sTitle, sFaIcon);
        };
        VexUtils.showPrompt = function (sMessage, sPlaceholder, sTitle, sFaIcon) {
            if (sMessage === void 0) { sMessage = null; }
            if (sPlaceholder === void 0) { sPlaceholder = ""; }
            if (sTitle === void 0) { sTitle = null; }
            if (sFaIcon === void 0) { sFaIcon = null; }
            if (jsutils.Utils.isNullOrUndef(sMessage) == true) {
                sMessage = "Enter value";
            }
            var sIcon = "<i class=\"fa fa-pencil-square-o padding-right prompt\" aria-hidden=\"true\"></i>";
            var sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>" + sTitle + "</span></div><div class='vex-custom-content'>" + sMessage + "</div>";
            var oPromise = new Promise(function (resolve, reject) {
                vex.dialog.prompt({
                    unsafeMessage: sHtml,
                    callback: function (value) {
                        if (value != false) {
                            resolve(value);
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
            return oPromise;
        };
        VexUtils.showPromptNumberOnly = function (sMessage, sTitle, sFaIcon) {
            if (sMessage === void 0) { sMessage = null; }
            if (sTitle === void 0) { sTitle = null; }
            if (sFaIcon === void 0) { sFaIcon = null; }
            if (jsutils.Utils.isNullOrUndef(sMessage) == true) {
                sMessage = "Enter value";
            }
            var sExtraUi = "<div class='vex-prompt-number-container'><i class='fa fa-plus'></i><input type='number' id='vex-prompt-number-input'><i class='fa fa-minus'></i></div>";
            var sIcon = "<i class=\"fa fa-pencil-square-o padding-right prompt\" aria-hidden=\"true\"></i>";
            var sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>" + sTitle + "</span></div><div class='vex-custom-content'>"
                + sMessage
                + sExtraUi
                + "</div>";
            var oPromise = new Promise(function (resolve, reject) {
                vex.dialog.open({
                    unsafeMessage: sHtml,
                    callback: function (value) {
                        if (value != false) {
                            resolve(value);
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
            return oPromise;
        };
        return VexUtils;
    }());
    jsutils.VexUtils = VexUtils;
})(jsutils || (jsutils = {}));
var ge;
(function (ge) {
    var cim;
    (function (cim) {
        var models;
        (function (models) {
            var RulesReportTableColumn = (function (_super) {
                __extends(RulesReportTableColumn, _super);
                function RulesReportTableColumn(sCaption) {
                    if (sCaption === void 0) { sCaption = ""; }
                    var _this = _super.call(this, sCaption) || this;
                    _this._bAllowFilters = false;
                    _this._bAllowSorting = false;
                    return _this;
                }
                RulesReportTableColumn.prototype.allowFilters = function () { this._bAllowFilters = true; return this; };
                RulesReportTableColumn.prototype.allowSorting = function () { this._bAllowSorting = true; return this; };
                RulesReportTableColumn.prototype.isSortingAllowed = function () { return this._bAllowSorting; };
                RulesReportTableColumn.prototype.getCssClasses = function () {
                    var sClasses = this.cssClasses;
                    if (this._bAllowSorting == true) {
                        sClasses += " " + "col-allow-sorting";
                    }
                    return sClasses;
                };
                return RulesReportTableColumn;
            }(models.TableColumn));
            models.RulesReportTableColumn = RulesReportTableColumn;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
//# sourceMappingURL=allclasses.js.map