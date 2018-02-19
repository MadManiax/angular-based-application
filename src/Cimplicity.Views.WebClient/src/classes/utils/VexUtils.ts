module jsutils
{
    export interface IVexButton
    {
        text : string;
        value : any;
        class? : string;
    }

    export class VexUtils
    {


        public static setDefaultTheme(sThemeName = 'vex-theme-plain')
        {
            (<any>vex).defaultOptions.className = sThemeName;
        }

        public static showErrorAlert(sMessage:string = null)
        {
            if(Utils.isNullOrUndef(sMessage) == true)
            {
                sMessage = "An error occurred, please try again later. If error persist contact IT support."
            }
            let sIcon = "<i class=\"fa fa-exclamation-circle padding-right red-cancel-no-etc-text error\" aria-hidden=\"true\"></i>";

            let sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>Error</span></div><div class='vex-custom-content'>" + sMessage +"</div>";

            var oPromise = new Promise(function(resolve, reject) {

                vex.dialog.alert({
                    unsafeMessage : sHtml,
                    callback: function (value) {
                        resolve(value === true);
                    }
                })
            });

            return oPromise;
        }

        /**
         * Generate a 'confirm' dialog using promises, so action when user click on 'OK' or 'Cancel'
         * @param sMessage
         * @return {Promise}
         */
        public static showConfirm(sMessage:string = null, sTitle:string=null, sFaIcon:string=null) : Promise<boolean>
        {
            if(Utils.isNullOrUndef(sMessage) == true)
            {
                sMessage = "An error occurred, please try again later. If error persist contact IT support."
            }

            if(Utils.isNullOrUndef(sFaIcon) == true){
                sFaIcon = "fa-question-circle-o"
            }
            let sIcon = "<i class=\"fa " + sFaIcon + " padding-right confirm-dialog-icon\" aria-hidden=\"true\"></i>";

            if( Utils.isNullOrUndef(sTitle) == true){
                sTitle = "";
            }
            let sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>"+ sTitle +"</span></div><div class='vex-custom-content'>" + sMessage +"</div>";


            var oPromise = new Promise<boolean>(function(resolve, reject) {

                vex.dialog.confirm({
                    unsafeMessage : sHtml,
                    callback: function (value) {
                        resolve(value === true);
                    }
                })
            });

            return oPromise;
        }

        public static showEnterData(sMessage:string = null, sPlaceholder:string = "", sTitle:string=null, sFaIcon:string=null):Promise<any>
        {
            return VexUtils.showPrompt(sMessage, sPlaceholder, sTitle, sFaIcon);
        }
        public static showPrompt(sMessage:string = null, sPlaceholder:string = "", sTitle:string=null, sFaIcon:string=null):Promise<any>
        {
            if(Utils.isNullOrUndef(sMessage) == true)
            {
                sMessage = "Enter value";
            }
            let sIcon = "<i class=\"fa fa-pencil-square-o padding-right prompt\" aria-hidden=\"true\"></i>";

            let sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>" + sTitle + "</span></div><div class='vex-custom-content'>" + sMessage +"</div>";

            var oPromise = new Promise<any>(function(resolve, reject) {

                vex.dialog.prompt({
                    unsafeMessage : sHtml,
                    callback: function (value) {
                        if( value != false) {
                            resolve(value);
                        }
                        else {
                            reject();
                        }
                    }
                })
            });

            return oPromise;
        }


        public static showPromptNumberOnly(sMessage:string = null, sTitle:string=null, sFaIcon:string=null):Promise<any>
        {
            if(Utils.isNullOrUndef(sMessage) == true)
            {
                sMessage = "Enter value";
            }

            let sExtraUi = "<div class='vex-prompt-number-container'><i class='fa fa-plus'></i><input type='number' id='vex-prompt-number-input'><i class='fa fa-minus'></i></div>";

            let sIcon = "<i class=\"fa fa-pencil-square-o padding-right prompt\" aria-hidden=\"true\"></i>";
            let sHtml = "<div class=\"vex-dialog-top-bar\">" + sIcon + "</i><span>" + sTitle + "</span></div><div class='vex-custom-content'>"
                + sMessage
                + sExtraUi
                +"</div>";

            var oPromise = new Promise<any>(function(resolve, reject) {

                vex.dialog.open({
                    unsafeMessage : sHtml,
                    callback: function (value) {
                        if( value != false) {
                            resolve(value);
                        }
                        else {
                            reject();
                        }
                    }
                })
            });

            return oPromise;
        }
    }
}
