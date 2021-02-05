sap.ui.define([
    "megafon/controller/MasterDetail",
    "megafon/model/Formatter",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "megafon/utils/graph/Graph",
    "megafon/utils/node/Node",
    "megafon/utils/Position",
    "megafon/model/Donuts",
    "sap/ui/model/Filter",
], function (
    MasterDetail,
    Formatter,
    Fragment,
    JSONModel,
    Graph,
    Node,
    Position,
    Donuts,
    Filter
) {
    "use strict";


    var oController = {
        onInit: function() {
            
        },

        onAfterRendering: function() {;
            this.mRequest = this.getComponentModel("mRequest");
            this.mRequest.setProperty("/positions", Donuts.getPositions());

            setTimeout(function() {
                Graph.create.call(this);
                this.renderGraph.call(this);
            }.bind(this), 500);
        },

        renderGraph: function() {
            var aPositions = this.mRequest.getProperty("/positions");
            var aNodes = Node.getNodes.call(this, aPositions);
            this.oOrgChart.load(aNodes);
            this.oOrgChart.draw(OrgChart.action.init);
        },
        
    };
  
    return MasterDetail.extend("megafon.controller.Detail", oController);
});