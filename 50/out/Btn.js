(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'GLB.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('GLB.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB);
		global.Btn = mod.exports;
	}
})(this, function (exports, _GLB) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Btn;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	const CAMERA_WIDTH = 20;
	const W = 800;
	const BILI = 800 / 600;
	function Btn(str, w, h, pow, pow_y) {
		var width = CAMERA_WIDTH * w / W,
		    height = CAMERA_WIDTH * h / W;
		pow_y == undefined ? pow_y = pow : 1;

		var geometry = new THREE.PlaneGeometry(width, height, 1, 1);
		var material = new THREE.MeshBasicMaterial({ map: _GLB2.default.res[str] });
		material.transparent = true;
		var plane = new THREE.Mesh(geometry, material);

		var uv_y = h / pow_y,
		    uv_x = w / pow;
		var bricks = [new THREE.Vector2(0, uv_y), new THREE.Vector2(0, 0), new THREE.Vector2(uv_x, 0), new THREE.Vector2(uv_x, uv_y)];
		geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
		geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];

		this.__proto__ = plane;
	}
});