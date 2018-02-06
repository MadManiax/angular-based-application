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
//# sourceMappingURL=CookieManager.js.map