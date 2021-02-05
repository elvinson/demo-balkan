sap.ui.define([
    "megafon/controller/MasterDetail",
    "megafon/model/Formatter",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (
    MasterDetail,
    Formatter,
    Fragment,
    JSONModel
) {
    "use strict";
    return MasterDetail.extend("megafon.controller.Main", {
        onInit: function() {
            this.mView = new JSONModel({
                isMainPageBusy: false
            });
        },
    });
});