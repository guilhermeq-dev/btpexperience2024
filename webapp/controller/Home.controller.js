sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("com.lab2dev.btpexperience.controller.Home", {
      onInit: function () {
        // cria um modelo JSON com as empresas (dados importados de um arquivo json localizado na model)
        const oModel = new JSONModel();
        oModel.loadData("/model/companys.json");
        // faz a ligação/seta o model na ViewXML (Aggregation Binding)
        this.getView().setModel(oModel, "companyInfo");
      },
      // função chamando o Dialog de Cadastro de empresa (na view)
      openModal: function () {
        const viewId = this.getView().getId();
        // carrega o fragmento dialog
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
        });
        //
        this.getView().setModel(oDataModel, "formData");
        // Abre o dialog
        this.dialog.open();
      },
      // função que vai salvar os novos dados na tabela
      onSendFormData: function () {
        const formData = this.getView().getModel("formData").getData();
        const companyInfoList = this.getView()
          .getModel("companyInfo")
          .getData();

        // varial declarada para pegar a propriedade selectedKey pelo ID
        const selectedState =
          this.byId("selectState").getProperty("selectedKey");

        this.getView()
          .getModel("companyInfo")
          .setData([
            ...companyInfoList,
            {
              ...formData,
              companyID:
                companyInfoList[companyInfoList.length - 1].companyID + 1,
              region: selectedState === "placeholder" ? " " : selectedState
            },
          ]);

        this.onCloseDialog();
      },
      // fecha o dialog ao pressionar o botão "Cadastrar empresa" dentro do dialog
      onCloseDialog: function () {
        this.dialog.close();
      },
      // SearchField adicionado
      onSearch: function (oEvent) {
        // add filter for search
        var aFilters = [];
        var sQuery = oEvent.getSource().getValue();
        if (sQuery && sQuery.length > 0) {
          var filter = new Filter(
            "companyName",
            FilterOperator.Contains,
            sQuery
          );
          aFilters.push(filter);
        }

        // update list binding
        var oList = this.byId("tableID");
        var oBinding = oList.getBinding("rows");
        oBinding.filter(aFilters);
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
