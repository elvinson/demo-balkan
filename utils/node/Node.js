sap.ui.define([
    "megafon/model/Formatter"
],
	function (Formatter) {
        "use strict";

        function getNode(oPosition) {
            return getNodes.call(this, [oPosition])[0];
        }
        
        function getNodes(aPositions) {
            return aPositions.map(function(oPosition) {
                return convertPositionToNode.call(this, oPosition);
            }.bind(this));
        };

        function getNodeTags(oPosition) {
            var aTags = [];

            if (oPosition.isManager) {
                aTags.push("manager");
            }

            if (oPosition.isNew) {
                aTags.push("new");
            }

            if (oPosition.isVacant) {
                aTags.push("vacant");
            }

            if (oPosition.expandable) {
                aTags.push("expandable");
            }

            return aTags;
        };

        function convertPositionToNode (oPosition) {
            var oBundle = this.getResourceBundle();
            var aMoneyParms = [
                Formatter.getNodeCost(oPosition.salary), 
                Formatter.getNodeCost(oPosition.wage)
            ];
            var sMoney = oBundle.getText("MONEY_FIELD", aMoneyParms);
            var sShortName = "";
            var sPhotoUrl = "";

            if (_.has(oPosition.persons, 'results') && oPosition.persons.results.length !== 0) {
                var oFirstPerson = _.first(oPosition.persons.results);
                var sShortName = oFirstPerson.shortName;
                var sPhotoUrl = oFirstPerson.photoUrl;
            }

            var oNode = {
                id: Number(oPosition.positionId),
                position: oPosition.title,
                orgeh: oPosition.orgehTitle,
                city: oPosition.city,
                money: sMoney,
                name: sShortName,
                photo: sPhotoUrl,
                plansCount: oPosition.plansCount,
            };

            var aTags = getNodeTags(oPosition);

            if (aTags.length !== 0) {
                oNode.tags = aTags;
            }

            if (_.has(oPosition, 'parentId')) {
                oNode.pid = Number(oPosition.parentId);
            }

            if (oNode.position.length >= 32) {
                oNode.position = oNode.position.slice(0,32).trim() + "...";
            }

            if (oNode.orgeh.length > 36) {
                oNode.orgeh = oNode.orgeh.slice(0,36).trim() + "...";
            }
            
            return oNode;
        };

		return {
            getNode: getNode,
            getNodes: getNodes
        };
}, true);