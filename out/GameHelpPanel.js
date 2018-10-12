(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'GLB.js', 'GameHelpPanel3D.js', 'GameHelpPanel2D.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('GLB.js'), require('GameHelpPanel3D.js'), require('GameHelpPanel2D.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB, global.GameHelpPanel3D, global.GameHelpPanel2D);
		global.GameHelpPanel = mod.exports;
	}
})(this, function (exports, _GLB, _GameHelpPanel3D, _GameHelpPanel2D) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GameHelpPanel;

	var _GLB2 = _interopRequireDefault(_GLB);

	var _GameHelpPanel3D2 = _interopRequireDefault(_GameHelpPanel3D);

	var _GameHelpPanel2D2 = _interopRequireDefault(_GameHelpPanel2D);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var W = _GLB2.default.W;
	var H = _GLB2.default.H;
	var ROTATION = {
		x: -Math.PI / 4,
		y: Math.PI / 16,
		z: 0
	};
	var POSITION = {
		x: -5,
		y: 0,
		z: -1
	};

	function GameHelpPanel(game_scene) {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};

		this.MyAPI["2D"] = new _GameHelpPanel2D2.default(game_scene);
		this.MyAPI["3D"] = new _GameHelpPanel3D2.default();
		this.MyAPI["3D"].rotation.set(ROTATION.x, ROTATION.y, ROTATION.z);
		this.add(this.MyAPI["2D"]);
		this.add(this.MyAPI["3D"]);

		this.MyAPI.render = function () {
			this.MyAPI["2D"].MyAPI.render.bind(this.MyAPI["2D"])();
			this.MyAPI["3D"].MyAPI.render.bind(this.MyAPI["3D"])();
		};
		this.MyAPI.init = function () {
			this.MyAPI["2D"].MyAPI.init.bind(this.MyAPI["2D"])();
			this.MyAPI["3D"].MyAPI.init.bind(this.MyAPI["3D"])();

			var width_height = this.MyAPI["3D"].MyAPI.getCenter.bind(this.MyAPI["3D"])();
			var x = -width_height.x / 2,
			    y = POSITION.y,
			    z = -1;
			this.MyAPI["3D"].position.set(x, POSITION.y, POSITION.z);
		};
		this.MyAPI.showTip = function (index) {
			this.MyAPI["2D"].MyAPI.showTip.bind(this.MyAPI["2D"])(index);
		};
	}
});