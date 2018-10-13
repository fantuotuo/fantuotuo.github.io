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
		global.Box1 = mod.exports;
	}
})(this, function (exports, _GLB) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Box1;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const W = window.innerWidth;
	const H = window.innerHeight;
	function Box1() {
		this.__proto__ = new THREE.Group();

		let o = _GLB2.default.res["box2"];
		this.add(o);
		o.x = W / 2;
		o.z = H / 2;

		this.MyAPI = {};
		this.MyAPI.render = function () {};
	}
});