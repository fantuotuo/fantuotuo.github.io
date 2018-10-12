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
		global.Container = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Container;
	var W = 800;
	var H = 600;

	function Container() {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};
		this.MyAPI.render = function () {
			for (var i = 0; i < this.children.length; i++) {
				if (this.children[i].MyAPI && this.children[i].MyAPI.render) {
					this.children[i].MyAPI.render.bind(this.children[i])();
				}
			}
		};

		this.position.x = -W / 2;
		this.position.z = -H / 2;
	}
});