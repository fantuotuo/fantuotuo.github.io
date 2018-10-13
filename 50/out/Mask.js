(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'Btn.js', 'BtnTxt.js', 'GLB.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('Btn.js'), require('BtnTxt.js'), require('GLB.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Btn, global.BtnTxt, global.GLB);
		global.Mask = mod.exports;
	}
})(this, function (exports, _Btn, _BtnTxt, _GLB) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Mask;

	var _Btn2 = _interopRequireDefault(_Btn);

	var _BtnTxt2 = _interopRequireDefault(_BtnTxt);

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function Mask() {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};
		var bg = new _Btn2.default("bg_mask.png", 800, 600, 1024);
		bg.rotation.x = Math.PI * 3 / 2;
		bg.position.set(0, 10, 0);
		this.add(bg);

		var btn_txt = new _BtnTxt2.default("你好");
		btn_txt.position.set(0, 11, 0);
		this.add(btn_txt);

		this.MyAPI.showTxt = function (txt) {
			btn_txt.MyAPI.freshTxt.bind(btn_txt)(txt);
		};
	}
});