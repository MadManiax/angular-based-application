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
//# sourceMappingURL=CounterRule.js.map