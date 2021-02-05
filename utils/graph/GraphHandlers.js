sap.ui.define([
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "megafon/utils/Position",
    "megafon/utils/node/Node",
    "megafon/model/Donuts",
],  function (Fragment, JSONModel, Position, Node, Donuts) {
        "use strict";

        function setHandlers() {
            this.oOrgChart.on('click', function (sender, nodeId) {
                onHandleNodeClick.call(this, sender, nodeId);
                return false;
            }.bind(this));

            this.oOrgChart.on('add', function(sender, node) {
                onHandleNodeAdding.call(this, sender, node);
                return false;
            }.bind(this));

    
            this.oOrgChart.on('remove', function (sender, nodeId) {
                onHandleNodeRemove.call(this, sender, nodeId);
                return false;
            }.bind(this));

            this.oOrgChart.on('redraw', function() {
                var expandButtons = document.querySelectorAll('.btn');

                expandButtons.forEach(function(button) {
                    button.addEventListener('click', onClickExpandButton.bind(this));
                }.bind(this));

            }.bind(this));

            this.oOrgChart.editUI.show = function(nodeId) {
                onHandleNodeUpdate.call(this, this.oOrgChart, nodeId);
            }.bind(this);
        };


        function onHandleNodeUpdate(sender, nodeId) {
            this.mView.setProperty("/isDescSectionOpen", false);
            this.mView.setProperty("/isGraphInfoOpen", false);
            this.mView.setProperty("/isEditPositionDialogVisible", true);
            var oPosition = Position.find.call(this, nodeId);

            var oRequest = this.getRequestObject();

            this.setDetailBusy(true);
            this.getPositionHelpData(oRequest)
            .then(function(aResults) {
                this.setDetailBusy(false);
                console.log('F4HelpPositionSet', aResults);
                this.mHelpData.setData({
                    prems: aResults[0].results,
                    poscats: aResults[1].results,
                    postypes: aResults[2].results,
                });

                return this.getDetailPosition(oPosition.plansId, oPosition.requestId, oPosition.positionId);
            }.bind(this))
            .then(function(oData) {
                console.log('DetailPositionSet', oData);
                this.mDetailPosition.setData(oData);
            }.bind(this));
        };

        function onHandleNodeClick(sender, node) {
            // Если нажатие на фейковый плюс
            var isFakePlusBtn = node.event.target.parentElement.classList.contains('btn');

            if (isFakePlusBtn) {
                return;
            }

        };

        function onClickExpandButton(event) {
            var currentTarget = event.currentTarget;
            var currentNodeId = currentTarget.parentNode.getAttribute("node-id");

            var mRequest = this.getComponentModel("mRequest")

            Donuts.getExpands().then(function(oData) {
                var aExpandedPositions = Position.flattern(oData);
                var aFilteredExpandedPositions = aExpandedPositions.filter(function (oP) { 
                    return oP.positionId !== currentNodeId;
                });

                var aUpdatedExpandedPositions = aFilteredExpandedPositions.map(function(pos) {
                    pos.parentId = currentNodeId;
                    return pos;
                });

                var aCurrentPositions = mRequest.getProperty("/positions");
                var aUpdatedPositions = _.concat(aCurrentPositions, aUpdatedExpandedPositions);
                mRequest.setProperty("/positions", aUpdatedPositions);

                var aNodes = Node.getNodes.call(this, aUpdatedExpandedPositions);
                aNodes.forEach(function(oNode) {
                    this.oOrgChart.add(oNode);
                }.bind(this));
                
                this.oOrgChart.expand(Number(currentNodeId), _.map(aNodes, 'id'));
            }.bind(this));
        };

		return {
           setHandlers: setHandlers
        };
}, true);