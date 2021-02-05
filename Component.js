sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel",
], function (UIComponent, JSONModel) {
  "use strict";
  return UIComponent.extend("megafon.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);
      
      this.setModel(new JSONModel(), "mRequest");
      
      // create the views based on the url/hash
      this.getRouter().initialize();
    }
  });
});