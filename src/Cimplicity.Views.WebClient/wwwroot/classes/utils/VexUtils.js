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
        return VexUtils;
    }());
    jsutils.VexUtils = VexUtils;
})(jsutils || (jsutils = {}));
//# sourceMappingURL=VexUtils.js.map