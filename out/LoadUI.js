(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "Btn.js", "BtnTxt.js"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("Btn.js"), require("BtnTxt.js"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Btn, global.BtnTxt);
		global.LoadUI = mod.exports;
	}
})(this, function (exports, _Btn, _BtnTxt) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = LoadUI;

	var _Btn2 = _interopRequireDefault(_Btn);

	var _BtnTxt2 = _interopRequireDefault(_BtnTxt);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var CAMERA_WIDTH = 20;
	var CAMERA_HEIGHT = 16;
	var BAR_BG_W = 0.7 * CAMERA_WIDTH;
	var BAR_W = 0.695 * CAMERA_WIDTH;

	function LoadUI() {
		this.__proto__ = new THREE.Group();
		var geo = new THREE.PlaneGeometry(20, 16);
		var mat = new THREE.MeshBasicMaterial();
		mat.map = new THREE.CanvasTexture(gene());
		var bg = new THREE.Mesh(geo, mat);
		bg.rotation.x = Math.PI * 3 / 2;
		bg.position.y = 0;
		this.add(bg);

		var logo = new _Btn2.default("loading_logo.png", 230, 230, 256);
		logo.rotation.x = Math.PI * 3 / 2;
		logo.position.y = 2;
		logo.position.z = -1;
		this.add(logo);

		geo = new THREE.PlaneGeometry(BAR_BG_W, 0.5);
		mat = new THREE.MeshBasicMaterial();
		mat.map = new THREE.CanvasTexture(gene("#000000"));
		var bar_bg = new THREE.Mesh(geo, mat);
		bar_bg.rotation.x = Math.PI * 3 / 2;
		bar_bg.position.y = 1;
		bar_bg.position.z = 4.3;
		this.add(bar_bg);

		geo = new THREE.PlaneGeometry(BAR_W, 0.4);
		mat = new THREE.MeshBasicMaterial();
		mat.map = new THREE.CanvasTexture(gene("#009900"));
		var bar = new THREE.Mesh(geo, mat);
		bar.rotation.x = Math.PI * 3 / 2;
		bar.position.y = 1.1;
		bar.position.z = 4.3;
		this.add(bar);

		var txt = new _BtnTxt2.default("1213", "#000000", 1024, 64, 30, false);
		txt.position.y = 2;
		txt.position.z = 5.3;

		this.add(txt);

		function gene(c) {
			c = c ? c : "#888888";
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			canvas.width = 64;
			canvas.height = 64;

			ctx.fillStyle = c;
			ctx.fillRect(0, 0, 64, 64);

			return canvas;
		}

		this.setProgress = function (current, total) {
			var bili = current / total;
			var perc = Math.floor(100 * bili);
			bar.scale.x = bili;
			var inter = (BAR_BG_W - BAR_W * bili) / 2;
			bar.position.x = -(inter - (BAR_BG_W - BAR_W) / 2);

			txt.MyAPI.freshTxt.bind(txt)("loading..." + perc + "%");
		};
	}
});