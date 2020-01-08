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
	const scale = 0.6;
	const B_H = 120 * scale;
	const B_W = 200 * scale;
	const SPEED = 100;
	const DEPTH = 80;
	const OFFSET = 100 * scale;
	function Box1() {
		this.__proto__ = new THREE.Group();

		let o = _GLB2.default.res["box2"];
		this.add(o);
		o.position.y = B_W / 2;
		o.rotation.y = Math.PI / 2;
		o.rotation.x = -Math.PI / 2;

		o.scale.x = o.scale.y = o.scale.z = scale;

		this.position.x = W / 2;
		this.position.z = -B_H + H / 2 + DEPTH + OFFSET;
		this.position.y = -B_W / 2;

		let r = -1;
		let rotateEnd = function () {};
		this.startRotate = function (callback) {
			r = -Math.PI / 2;
			rotateEnd = callback;
		};
		this.MyAPI = {};
		this.MyAPI.render = function () {
			if (r == -1) {
				return;
			}
			this.rotation.x += r / SPEED;
			if (this.rotation.x <= r) {
				r = -1;
				rotateEnd();
			}
		};
	}
});