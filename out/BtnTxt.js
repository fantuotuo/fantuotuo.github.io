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
		global.BtnTxt = mod.exports;
	}
})(this, function (exports, _GLB) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = BtnTxt;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var C = "rgba(255,255,0,1)";
	var W = 1024;
	var H = 1024;
	var CAMERA_WIDTH = 19;
	var BILI = 800 / 600;
	function BtnTxt(txt, c, w, h, size, center) {

		if (c == undefined) {
			var c = C;
		}
		if (w == undefined) {
			var w = W;
		}
		if (h == undefined) {
			var h = H;
		}
		if (size == undefined) {
			var size = 40;
		}
		if (center == undefined) {
			var center = true;
		}

		var sprite_material = new THREE.SpriteMaterial({
			map: new THREE.CanvasTexture(generateCanvas(txt))
		});
		this.__proto__ = new THREE.Sprite(sprite_material);
		this.scale.set(CAMERA_WIDTH, CAMERA_WIDTH * h / w, 1);

		function generateCanvas(txt) {
			var off_canvas = document.createElement("canvas");
			off_canvas.width = w;
			off_canvas.height = h;

			var ctx = off_canvas.getContext("2d");
			ctx.fillStyle = "rgba(255,0,0,1)";
			// ctx.fillRect(0,0,1024,1024);
			ctx.fillStyle = c;
			ctx.textAlign = "center";
			ctx.font = size + 'px Microsoft YaHei';
			if (center) {
				ctx.fillText(txt, 1024 / 2, 512);
			} else {
				ctx.fillText(txt, 1024 / 2, size);
			}

			return off_canvas;
		}

		this.MyAPI = {};
		this.MyAPI.freshTxt = function (txt) {
			this.material.map = new THREE.CanvasTexture(generateCanvas(txt));
		};
		// console.log(this.material.map)
	}
});