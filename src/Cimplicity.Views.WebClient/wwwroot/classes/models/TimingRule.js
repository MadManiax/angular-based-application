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
                    this.WorkCell = "OP" + Math.round(Math.random() * 99);
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
                    this.Name = "Timing Rule Name-" + Math.round(Math.random() * 9999);
                    return this;
                };
                TimingRule.DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
                return TimingRule;
            }(models.Rule));
            models.TimingRule = TimingRule;
        })(models = cim.models || (cim.models = {}));
    })(cim = ge.cim || (ge.cim = {}));
})(ge || (ge = {}));
//# sourceMappingURL=TimingRule.js.map