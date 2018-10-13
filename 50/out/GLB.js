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
		global.GLB = mod.exports;
	}
})(this, function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = {
		changeScene: function () {},

		res: {},
		handler_timeout: undefined,
		W: 800,
		H: 600,
		CAMERA_WIDTH: 20,

		game_scene: undefined

	};
});