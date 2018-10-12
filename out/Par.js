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
		global.Par = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Par;
	var N = 200;
	var W = 800;
	var H = 600;
	var SINGLE_AREA = W * H / N;
	var AREA_LENGTH = Math.floor(Math.sqrt(SINGLE_AREA));
	var SPEED = 50;
	var T = 100;

	function Par(i) {
		var geo = new THREE.SphereGeometry(5, 32, 32);
		var r = 20 + Math.floor(185 * Math.random()),
		    g = 20 + Math.floor(185 * Math.random()),
		    b = 20 + Math.floor(185 * Math.random());
		var color = 256 * 256 * r + 256 * g + b;

		var mat = new THREE.MeshLambertMaterial({ color: color });
		mat.transparent = true;
		this.__proto__ = new THREE.Mesh(geo, mat);

		this.x = i * AREA_LENGTH % W;
		this.y = Math.floor(i * AREA_LENGTH / W) * AREA_LENGTH;

		this.o_x = this.dx = this.x;
		this.o_y = this.dy = this.y;

		this.r = 3;
		this.alpha = 1;

		this.MyAPI = {};

		var t = Math.random() * T;
		this.MyAPI.render = function () {
			this.position.x = this.x;
			this.position.z = this.y;

			this.x += (this.dx - this.x) / SPEED;
			this.y += (this.dy - this.y) / SPEED;
			mat.opacity = this.alpha;

			var scale = 0.8 + 0.2 * Math.cos(t * 2 * Math.PI / T);
			this.scale.x = this.scale.y = this.scale.z = scale;
			t += 1;
		};
	}
});