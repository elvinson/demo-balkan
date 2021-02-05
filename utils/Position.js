sap.ui.define([
    "megafon/model/Formatter",
    "megafon/utils/node/Node",
],
	function (Formatter, Node) {
        "use strict";


        function add(oNewPosition) {
            var mRequest = this.getComponentModel("mRequest");
            var aPositions = mRequest.getProperty("/positions");
            mRequest.setProperty("/positions", aPositions.concat(oNewPosition));
            var oNewNode = Node.getNode.call(this, oNewPosition);
            this.oOrgChart.addNode(oNewNode);
            // this.oOrgChart.expand(Number(currentNodeId), _.map(aNodes, 'id'));
            // debugger;
        };

        /**
         * Функция поиска позиции в модели
         * @param {*} positionId (nodeId) 
         */
        function find(positionId) {
            var aPositions = this.getComponentModel("mRequest").getProperty("/positions");

            return _.find(aPositions, function(oPosition) {
                return oPosition.positionId == positionId;
            });
        };
        
        /**
         * Выпрямляет дерево в плоский массив
         * @param {*} oPosition 
         */
        function flattern(oPosition) {
            var setParent = function(oPosition, sParentId) {
                oPosition.parentId = sParentId;
                return oPosition;
            };
            
            var aOrphanedChildren = _.has(oPosition.positions, 'results') 
                ? oPosition.positions.results
                : [];
            
            var aParentedChildren =  aOrphanedChildren.map(function(oChild) {
                return setParent(oChild, oPosition.positionId);
            });

            return _.concat([], oPosition, aParentedChildren);
        };

		return {
            add: add,
            find: find,
            flattern: flattern
        };
}, true);