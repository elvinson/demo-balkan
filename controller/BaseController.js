sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/model/Filter"
], function (
	Controller,
	UIComponent,
	Filter,
) {
	"use strict";

	var oBaseController = {
		/**
		 * Возвращает пакет ресурса модели интернационализации
		 * @returns {sap.base.i18n.ResourceBundle}
		 * @public
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Возвращает объект роутера по маршруту для текущего контроллера
		 * @returns {sap.m.routing.Router}
		 * @public 
		 */
		getRouter: function () {
			return UIComponent.getRouterFor(this);;
		},

		getCurrentRoute: function() {
			return this.getRouter().oHashChanger.getHash();
		},

		/**
		 * Возвращает модель из текущего представления по имени
		 * @param {string} sName Название модели
		 * @returns {sap.m.routing.Router}
		 * @public
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Возвращает модель глобальную модель по имени
		 * @param {string} sName Название модели
		 * @returns {sap.m.routing.Router} 
		 * @public
		 */
		getComponentModel: function (sName) {
			return this.getOwnerComponent().getModel(sName);
		},

		getServiceModel: function() {
			return this.getComponentModel("zmlg_oss_srv");
		},

	};

	return Controller.extend("megafon.controller.BaseController", oBaseController);
});