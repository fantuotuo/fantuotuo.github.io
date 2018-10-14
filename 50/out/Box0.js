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
		global.Box0 = mod.exports;
	}
})(this, function (exports, _GLB) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Box0;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const W = window.innerWidth;
	const H = window.innerHeight;
	const scale = 0.6;
	const DEPTH = 80;
	const OFFSET = 100 * scale;
	function Box0() {
		this.__proto__ = new THREE.Group();

		let geo = new THREE.BoxGeometry(100, 100, 100);
		let mat = new THREE.MeshLambertMaterial({ color: 0xff0000 });
		// let o=new THREE.Mesh(geo,mat);
		// this.add(o)

		let o = _GLB2.default.res["box5"];
		this.add(o);
		o.scale.x = o.scale.y = o.scale.z = scale;

		this.position.x = W / 2;
		this.position.z = H / 2 + DEPTH + OFFSET;
		this.rotation.x = -Math.PI / 2;

		this.MyAPI = {};
		this.MyAPI.render = function () {};
	}
});