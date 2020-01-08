(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports);
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports);
		global.GameHelpPanel3D = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GameHelpPanel3D;
	function GameHelpPanel3D() {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};

		this.MyAPI.render = function () {};
		this.MyAPI.init = function () {};
	}
});