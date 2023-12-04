sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
	"sap/ui/layout/form/ResponsiveGridLayout",
    "sap/ui/layout/form/Form",
    "sap/ui/layout/form/FormContainer",
    "sap/ui/layout/form/FormElement",
    "sap/m/Label",
    "sap/m/Select",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel, Dialog, Button, Input, ResponsiveGridLayout, Form, FormContainer, FormElement, Label, Select, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
            onInit: function () {

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

                const oModel = new JSONModel(infos)
                this.getView().setModel(oModel, "companyInfo")

            },
            // função que chama o modal (botao declarado na view)
            openModal: function () {
                this.createModal()
            },

            // criação do MODAL Cadastro de empresa
            createModal: function () {

            // Responsividade do layout (falta deixar funcional)
            var oLayout = new ResponsiveGridLayout({
                columnsL: 2,
                columnsM: 2,
                labelSpanL: 1,
                labelSpanM: 1
            });

            // Criação do formulário
            var oForm = new Form({
                layout: oLayout,
                formContainers: [
                    new FormContainer({
                        formElements: [
                            new FormElement({
                                label: new Label({ text: "Razão Social" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "CNPJ" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "Site" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "Pacote de patrocínio" }),
                                fields: [new Input({ placeholder: 'Selecione o pacote inicial'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "Nome Fantasia" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "Estado" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "E-mail de contato" }),
                                fields: [new Input({ placeholder: 'Texto'})]
                            }),
                            new FormElement({
                                label: new Label({ text: "Logo (imagem)" }),
                                fields: [new Input({ placeholder: 'Clique e escolha um arquivo de imagem'})]
                            }),
                        ]
                    })
                ]
            });
                // Dialog declarado
                var oDialog = new Dialog({
                    title: "Dados da empresa",
                    content: [oForm],
                    beginButton: new Button({  // botao de confirmação para cadastrar uma nova empresa
                        text: "Cadastrar empresa",
                        type: "Emphasized",
                        press: function () {
                            oDialog.close()
                        },
                    }),
                })
                oDialog.setContentWidth("400px")
                oDialog.setContentHeight("300px")
                oDialog.open() // funcao chamada para abrir o Modal
            },
            // SearchField adicionado 
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                if (sQuery && sQuery.length > 0) {
                    var filter = new Filter("companyName", FilterOperator.Contains, sQuery);
                    aFilters.push(filter);
                }
    
                // update list binding
                var oList = this.byId("tableID");
                var oBinding = oList.getBinding("rows");
                oBinding.filter(aFilters);
            },
        });
    });
