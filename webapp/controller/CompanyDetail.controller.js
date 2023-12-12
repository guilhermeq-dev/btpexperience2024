sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"],
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend(
      "com.lab2dev.btpexperience.controller.CompanyDetail",
      {
        onInit: function () {
          // inicializa a rota
          this.oRouter = this.getOwnerComponent().getRouter();
          // sempre que a rota 'CompanyDetail' for acessada vai rodar a função onRouteMatch
          this.oRouter
            .getRoute("CompanyDetail")
            .attachPatternMatched(this.onRouteMatch, this);
        },
        onRouteMatch: function (oEvent) {
          const oArguments = oEvent.getParameter("arguments")
          
          this.getCompanyInfo(oArguments.companyId).then((e) => {
            const oModel = new JSONModel(e);
            this.getView().setModel(oModel, "companyDetails");
          })
        },
        getCompanyInfo: async function (companyID) {
            const oModel = new JSONModel();
            await oModel.loadData("/model/companys.json");
            const oData = oModel.getData()
          
          return oData.find((el) => el.companyID === Number(companyID))
        },
        onBackHome: function () {
          history.back();
        },
        onOpenDialog: function () {
          if (!this.dialog) {
            this.dialog = sap.ui.xmlfragment(
              "com.lab2dev.btpexperience.view.fragments.Dialog",
              this
            );
            this.getView().addDependent(this.dialog);
          }
          // Abre o dialog
          this.dialog.open();
        },
        // "atualiza os dados" e fecha o dialog
        onSendFormData: function () {
          this.dialog.close();
        },
        onCancelAddForm: function () {
          this.dialog.close();
        },

      }
    );
  }
);
