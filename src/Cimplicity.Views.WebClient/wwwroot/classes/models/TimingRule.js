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
            var TimingRule = (function (_super) {
                __extends(TimingRule, _super);
                function TimingRule() {
                    return _super.call(this) || this;
                }
                TimingRule.prototype.getRemainingToString = function () { return this.Remaining + " sec"; };
                TimingRule.prototype.getSetToString = function () { return this.Set + " sec"; };
                TimingRule.prototype.getActualToString = function () { return this.Actual + " sec"; };
                TimingRule.prototype.getRuleType = function () { return "Timing"; };
                TimingRule.prototype.fillWithDummyData = function (bUseNullWorkUnit, bUseNoOverflow) {
                    if (bUseNullWorkUnit === void 0) { bUseNullWorkUnit = false; }
                    if (bUseNoOverflow === void 0) { bUseNoOverflow = false; }
                    this.WorkCell = "OP" + Math.round(Math.random() * 99);
                    if (bUseNullWorkUnit == false) {
                        this.WorkUnit = this.WorkCell + ":" + Math.round(Math.random() * 10);
                    }
                    else {
                        this.WorkUnit = null;
                    }
                    this.Set = Math.round(Math.random() * 9999);
                    do {
                        this.Actual = Math.round(Math.random() * 999);
                    } while (this.Actual > this.Set);
                    this.Remaining = this.Set - this.Actual;
                    this.OverflowSet = Math.round(Math.random() * 99);
                    if (Math.random() > 0.5) {
                        this.OverflowRemaining = Math.round(Math.random() * 10);
                    }
                    else {
                        this.OverflowRemaining = null;
                    }
                    this.RuleName = "Timing Rule Name-" + Math.round(Math.random() * 9999);
                    return this;
                };
                TimingRule.JSON_FIELD_WORK_CELL = "WorkCell";
                return TimingRule;
            }(models.Rule));
            models.TimingRule = TimingRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
//# sourceMappingURL=TimingRule.js.map