sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
],
    function (Controller, History) {
	    "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.CompanyDetail", {
            onInit: function() {
                
            },
            onNavBack: function () {
                const oHistory = History.getInstance()
                const sPreviousHash = oHistory.getPreviousHash()

                if (sPreviousHash !== undefined) {
                    window.history.go(-1)      
                } else {
                    const oComponent = this.getOwnerComponent()
                    const oRouter = oComponent.getRouter()
                    oRouter.navTo("RouteHome", {}, true)
                }
            }  
	});
});