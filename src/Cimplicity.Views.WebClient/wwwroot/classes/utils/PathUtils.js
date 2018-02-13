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
//# sourceMappingURL=PathUtils.js.map