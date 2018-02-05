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
                    this.RuleName = "Event Rule Name-" + Math.round(Math.random() * 9999);
                    return this;
                };
                return EventRule;
            }(models.Rule));
            models.EventRule = EventRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
