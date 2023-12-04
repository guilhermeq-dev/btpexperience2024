sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
            onInit: function () {

                const companyInfo = [
                    {
                        companyID: 10001,
                        companyName: "LAB2DEV",
                        corporateCode: "12.345.678/0001-90",
                        webSite: "www.lab2dev.com",
                        email: "contato@lab2dev.com",
                        region: "São Paulo"
                    },
                    {
                        companyID: 10002,
                        companyName: "LAB2DEV",
                        corporateCode: "12.345.678/0001-90",
                        webSite: "www.lab2dev.com",
                        email: "contato@lab2dev.com",
                        region: "São Paulo"
                    },
                    {
                        companyID: 10003,
                        companyName: "LAB2DEV",
                        corporateCode: "12.345.678/0001-90",
                        webSite: "www.lab2dev.com",
                        email: "contato@lab2dev.com",
                        region: "São Paulo"
                    },
                ]

                const oModel = new JSONModel(companyInfo)
                this.getView().setModel(oModel, "companyInfo")

            }
        });
    });
