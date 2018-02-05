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
                Object.defineProperty(Rule.prototype, "RuleName", {
                    get: function () {
                        return this._RuleName;
                    },
                    set: function (value) {
                        this._RuleName = value;
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
