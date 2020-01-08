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
	const N = 200;
	const W = window.innerWidth;
	const H = window.innerHeight;
	const SINGLE_AREA = W * H / N;
	const AREA_LENGTH = Math.floor(Math.sqrt(SINGLE_AREA));
	const SPEED = 100;
	const T = 100;
	const OFFSET = 100;

	function Par(i) {
		let geo = new THREE.SphereGeometry(4, 32, 32);
		let r = 20 + Math.floor(185 * Math.random()),
		    g = 20 + Math.floor(185 * Math.random()),
		    b = 20 + Math.floor(185 * Math.random());
		r = g = b = 255;
		let color = 256 * 256 * r + 256 * g + b;

		let mat = new THREE.MeshLambertMaterial({ color: color });
		mat.transparent = true;
		this.__proto__ = new THREE.Mesh(geo, mat);

		this.x = i * AREA_LENGTH % W;
		this.y = Math.floor(i * AREA_LENGTH / W) * AREA_LENGTH;

		this.o_x = this.dx = this.x;
		this.o_y = this.dy = this.y;

		this.r = 2;
		this.alpha = 1;

		this.MyAPI = {};

		let t = Math.random() * T;
		this.MyAPI.render = function (bool) {
			this.position.x = this.x;
			this.position.z = this.y;

			this.x += (this.dx - this.x) / SPEED;
			this.y += (this.dy - this.y) / SPEED;
			mat.opacity = this.alpha;

			// let scale=0.8+0.2*Math.cos(t*2*Math.PI/T);
			// this.scale.x=this.scale.y=this.scale.z=scale;
			// t+=1;

			bool && this.yanchi--;
			if (this.yanchi == 0) {
				if (this.qqq.dx != -1) {
					this.dx = this.qqq.dx;
					this.dy = this.qqq.dy;
				}
			}
		};

		this.x = W / 2;
		this.y = H / 2 + OFFSET;
		this.dx = this.x;
		this.dy = this.y;
		this.yanchi = Math.floor(Math.random() * 200) + 1;

		this.setYanchi = function (dx, dy) {
			this.qqq = {
				dx: dx, dy: dy
			};
		};
		this.qqq = {
			dx: -1, dy: -1
		};
	}
});