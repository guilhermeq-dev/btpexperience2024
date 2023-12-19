sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "com/lab2dev/btpexperience/model/formatter",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator, formatter) {
    "use strict";
    return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
      formatter: formatter,
      onInit: function () {
        
        const loadJSON = this.loadData();

        loadJSON.then((oModel) => {
          this.getView().setModel(oModel, "companyInfo");

          const oViewDetailsModel = new JSONModel({
            totalCompanyCount: oModel.getData().length,
          });
          this.getView().setModel(oViewDetailsModel, "viewDetails");
        });
      },
      loadData: async function () {
        
        const oModel = new JSONModel();

        await oModel.loadData("/model/companys.json");

        return oModel;
      },
      // função chamando o Dialog de Cadastro de empresa
      openModal: function () {
        const viewId = this.getView().getId();

        if (!this.dialog) {
          this.dialog = sap.ui.xmlfragment(
            viewId,
            "com.lab2dev.btpexperience.view.fragments.Dialog",
            this
          );

          this.getView().addDependent(this.dialog);
        }
        // cria uma nova instancia JSONModel vazia que vai receber os novos dados do formulario
        const oDataModel = new JSONModel({
          companyName: "",
          corporateCode: "",
          webSite: "",
          email: "",
          region: "",
          select: "",
        });
        //
        this.getView().setModel(oDataModel, "formData");
        this.dialog.open();
      },
      // função p/ salvar os novos dados na tabela
      onSendFormData: function () {
        const formData = this.getView().getModel("formData").getData();
        const companyInfoList = this.getView()
          .getModel("companyInfo")
          .getData();

        const aCompanies = [
          ...companyInfoList,
          {
            ...formData,
            companyID:
              companyInfoList[companyInfoList.length - 1].companyID + 1,
          },
        ];

        this.getView().getModel("companyInfo").setData(aCompanies);

        this.getView()
          .getModel("viewDetails")
          .setProperty("/totalCompanyCount", aCompanies.length);

        this.dialog.close();
      },
      onCancelAddForm: function () {
        this.dialog.close();
      },
      // SearchField adicionado
      onSearch: function (oEvent) {
        var aFilters = [];
        var sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          var filter = new Filter({
            filters: [
              new Filter("companyName", FilterOperator.Contains, sQuery),
              new Filter("region", FilterOperator.Contains, sQuery),
            ],
          });
          aFilters.push(filter);
        }

        var oTable = this.byId("tableID");
        var oBinding = oTable.getBinding("rows");
        oBinding.filter(aFilters);

        const oViewDetailsModel = this.getView().getModel("viewDetails");
        oViewDetailsModel.setProperty(
          "/totalCompanyCount",
          oBinding.getLength()
        );
        debugger;
      },
      // Navegação para a pagina de detalhes
      navCompanyDetail: function (oEvent) {
        // Origem do evento (Item clicado da tabela)
        const source = oEvent.getSource();
        //contexto do item da Tabela (Nome do model)
        const context = source.getBindingContext("companyInfo");
        // Index do item da Tabela
        const path = context.getPath();
        // Acesso ao Objeto do item da tabela pelo path
        const company = context.getObject(path);
        // Acesso ao ID da companhia
        const companyId = company.companyID;
        // Acesso ao Component da App.controller
        const oComponent = this.getOwnerComponent();
        // Acesso ao Router
        const oRouter = oComponent.getRouter();
        // Navegação para a rota CompanyDetail
        oRouter.navTo("CompanyDetail", {
          companyId: companyId,
        });
      },
    });
  }
);
