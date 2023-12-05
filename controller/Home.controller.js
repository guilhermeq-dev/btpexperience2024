sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Dialog, Filter, FilterOperator, Fragment) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
            onInit: function () {
                // array de objetos simulando uma lista de empresas
                const infos = [
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
                    {
                        companyID: 10004,
                        companyName: "PASTELARIA",
                        corporateCode: "11.345.678/0001-70",
                        webSite: "www.pastelaria.com",
                        email: "contato@pastelaria.com",
                        region: "Minas Gerais"
                    },
                    {
                        companyID: 10005,
                        companyName: "PASTELÃO",
                        corporateCode: "15.345.678/0001-40",
                        webSite: "www.pastelao.com",
                        email: "contato@pastelao.com",
                        region: "Rio de Janeiro"
                    },
                ]
                // cria um modelo JSON com as empresas 
                const oModel = new JSONModel()
                oModel.loadData('/model/companys.json')
                // faz a ligação com a ViewXML (Aggregation Binding)
                this.getView().setModel(oModel, "companyInfo")

            },
            // função que chama o modal (botao declarado na view)
            openModal: function () {
                this.createModal()
            },

            // função chamando o Dialog de Cadastro de empresa
            createModal: function () {
                const viewId = this.getView().getId()

                if (!this.dialog) {
                    this.dialog = sap.ui.xmlfragment(viewId, "com.lab2dev.btpexperience.view.fragments.Dialog", this)
                    this.getView().addDependent(this.dialog)
                }
                this.dialog.open()
            },
            onCloseDialog: function () {
                this.dialog.close()
            },
            // SearchField adicionado 
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = []
                var sQuery = oEvent.getSource().getValue()
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("companyName", FilterOperator.Contains, sQuery)
                    aFilters.push(filter)
                }
    
                // update list binding
                var oList = this.byId("tableID")
                var oBinding = oList.getBinding("rows")
                oBinding.filter(aFilters)
            },
        });
    });
