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
		global.Box0 = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Box0;
	function Box0() {
		this.__proto__ = new THREE.Group();

		let geo = new THREE.BoxGeometry(100, 100, 100);
		let mat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
		let o = new THREE.Mesh(geo, mat);
		this.add(o);

		this.MyAPI = {};
		this.MyAPI.render = function () {
			o.rotation.x += 0.01;
		};
	}
});