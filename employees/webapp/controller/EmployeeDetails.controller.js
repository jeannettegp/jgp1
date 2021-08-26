sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "nsjgp/employees/model/formatter"
], function (Controller, formatter) {

    function onInit() {

    };

    function onCreateIncidence() {

        var tableIncidence  = this.getView().byId("tableIncidence");
        var newIncidence    = sap.ui.xmlfragment("nsjgp.employees.fragment.NewIncidence", this);
        var incidenceModel  = this.getView().getModel("incidenceModel");

        var odata = incidenceModel.getData();
        var index = odata.length;
        odata.push({ index : index + 1 });
        incidenceModel.refresh();
        newIncidence.bindElement("incidenceModel>/" + index); 
        tableIncidence.addContent(newIncidence);

    };

    function onDeleteIncidence(oEvent) {

        var tableIncidence = this.getView().byId("tableIncidence");
        var rowIncidence    = oEvent.getSource().getParent().getParent();
        var incidenceModel  = this.getView().getModel("incidenceModel");
        var odata   = incidenceModel.getData();
        var contextObj  = rowIncidence.getBindingContext("incidenceModel");

        odata.splice(contextObj.index,1);
        for (var i in odata) {
            odata[i].index = parseInt(i) + 1.
        };

        incidenceModel.refresh();
        tableIncidence.removeContent(rowIncidence);

        for(var i in tableIncidence.getContent()){
            tableIncidence.getContent()[i].bindElement("incidenceModel>/" + i);
        };
    }

    var EmployeeDetails = Controller.extend("nsjgp.employees.controller.EmployeeDetails", {});
    EmployeeDetails.prototype.onInit = onInit;
    EmployeeDetails.prototype.onCreateIncidence = onCreateIncidence;
    EmployeeDetails.prototype.Formatter = formatter;
    EmployeeDetails.prototype.onDeleteIncidence = onDeleteIncidence;
    return EmployeeDetails;
});