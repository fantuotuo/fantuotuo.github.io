(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "GLB.js"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("GLB.js"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB);
		global.Pool = mod.exports;
	}
})(this, function (exports, _GLB) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Pool;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function Pool() {
		this.__proto__ = _GLB2.default.res["pool"].clone();
	}
});