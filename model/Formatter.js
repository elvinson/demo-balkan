sap.ui.define([],
	function () {
        "use strict";
        
		return {
            getDescSectionIcon: function(isDescSectionOpen) {
                switch(isDescSectionOpen) {
                    case false:
                        return "sap-icon://navigation-down-arrow";
                    case true:
                        return "sap-icon://navigation-up-arrow";
                }
            },

            getStructureStatusText: function(iStatusId) {
                var oBundle = this.getResourceBundle();

                switch(iStatusId) {
                    case "1":
                        return oBundle.getText("STRUCTURE_STATUS_1");
                    case "2":
                        return oBundle.getText("STRUCTURE_STATUS_2");
                    case "3":
                        return oBundle.getText("STRUCTURE_STATUS_3");
                    case "4":
                        return oBundle.getText("STRUCTURE_STATUS_4");
                    case "5":
                        return oBundle.getText("STRUCTURE_STATUS_5");
                    case "6":
                        return oBundle.getText("STRUCTURE_STATUS_6");
                    default:
                        return iStatusId;
                }
                
            },

            getApproverState: function(sState, sColor) {
                return '<span style="color:' + sColor + '">' + sState + '</span>';
            },

            getDeltaBody: function(sHeader, sColor) {
                return '<span style="color:' + sColor + '">' + sHeader + '</span>';
            },

            getRequestCost: function(sCost) {
                var oFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                    currencyCode: false,
                    decimals: false
                });
                return oFormat.format(sCost, 'RUB');
            },

            getNodeCost: function(sCost) {
                var oFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                    currencyCode: false,
                    decimals: false
                });
                return oFormat.format(sCost, 'RUB');
            },

            getCorrectCost: function(sCost) {
                var oFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                    currencyCode: false,
                    decimals: false
                });
                
                return oFormat.format(sCost, 'RUB');
            },

            getCorrectSalary: function(sSalary) {
                var oFormat = sap.ui.core.format.NumberFormat.getCurrencyInstance({
                    currencyCode: false,
                    decimals: false
                });
                
                return oFormat.format(sSalary, 'RUB');
            },

            getCorrectProzt: function(sProzt) {
                if (sProzt == "") {
                    return "0%";
                }
                return parseFloat(sProzt) + "%";
            },

            getRequestButtonIcon: function(sKey) {
                switch(sKey) {
                    case "DELETED_P":
                        return "sap-icon://group";
                    case "NEW_PLANS":
                        return "sap-icon://employee-pane";
                }
            },

            isGraphDescVisible: function(sTabKey) {
                return _.includes(["APPROVING", "HISTORY"], sTabKey);
            },

            isGraphInfoVisible: function(sTabKey) {
                return sTabKey === "CONSTRUCTOR";
            },

            isPositionDetailViewLowered: function(sTabKey) {
                return String(this.formatter.isGraphDescVisible(sTabKey));
            },

            getButtonIcon: function(sKey) {
                switch (sKey) {
                    case "SAVE": return "sap-icon://save";
                    case "COPY": return "sap-icon://copy";
                    case "DELETE": return "sap-icon://delete";
                }
            },

            isActionButtonVisible: function(aButtons) {
                if (!aButtons) {
                    return false;
                }

                var aFilteredButtons = aButtons.filter(function(oButton) {
                    return _.includes(["SAVE", "COPY", "DELETE"], oButton.key);
                });

                return aFilteredButtons.length !== 0;
            },

            // filterButtons: function(aButtons) {


            //     {path: 'key', operator: 'NE', value1: 'DELETED_P'},
            //     {path: 'key', operator: 'NE', value1: 'SAVE'},
            //     {path: 'key', operator: 'NE', value1: 'COPY'},
            //     {path: 'key', operator: 'NE', value1: 'DELETE'}
            // }
        };
}, true);