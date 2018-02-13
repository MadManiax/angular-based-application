module ge
{
    export class CookieManager
    {
        private static COOKIE_EXPIRE_TIME_DAYS = 1;
        private static COOKIES = {
            LOGGED_IN : "logged-in",
            AUTH_TOKEN : "authtoken",
            PUBLIC_KEY : "pubkey"
        }

        // *** Cookie - Server public key ***
        //<editor-fold desc="Cookie - Server public key ">
        public static saveServerPublicKey(sPubKey)
        {
            CookieManager.setCookie(CookieManager.COOKIES.AUTH_TOKEN, sPubKey, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        }
        public static getServerPublicKey()
        {
        return CookieManager.getCookie(CookieManager.COOKIES.PUBLIC_KEY);
        }
        //</editor-fold>

        // *** Cookie - User auth token ***
        //<editor-fold desc="Cookie - User auth token ">
        public static getAuthToken()
        {
            return CookieManager.getCookie(CookieManager.COOKIES.AUTH_TOKEN);
        }

        public static clearAuthToken() {
            CookieManager.deleteCookie(CookieManager.COOKIES.AUTH_TOKEN)
        }

        public static updateAuthToken(sAuthToken)
        {
            CookieManager.setAuthToken(sAuthToken);
        }
        public static setAuthToken(sAuthToken)
        {
            CookieManager.setCookie(CookieManager.COOKIES.AUTH_TOKEN, sAuthToken, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        }
        //</editor-fold>

        // *** Cookie - User logged/not logged ***
        //<editor-fold desc="Cookie - User logged/not logged">
        public static isUserLogged()
        {
            return (CookieManager.getLoggedUser() != null);
        }

        public static getLoggedUser() : string
        {
            return CookieManager.getCookie(CookieManager.COOKIES.LOGGED_IN);
        }

        public static setLoggedUser(sValue : string)
        {
            CookieManager.setCookie(CookieManager.COOKIES.LOGGED_IN, sValue, CookieManager.COOKIE_EXPIRE_TIME_DAYS);
        }

        public static setUserNotLogged()
        {
            CookieManager.deleteCookie(CookieManager.COOKIES.LOGGED_IN);
            CookieManager.deleteCookie(CookieManager.COOKIES.AUTH_TOKEN);
        }
        //</editor-fold>



        private static deleteCookie(cname)
        {
            CookieManager.setCookie(cname, "", -1000);
        }

        private static setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        private static getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }
            return null;
        }
    }
}
