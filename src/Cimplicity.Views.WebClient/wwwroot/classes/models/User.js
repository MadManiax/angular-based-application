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
//# sourceMappingURL=User.js.map