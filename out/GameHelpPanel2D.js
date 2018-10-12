(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'GLB.js', 'Btn.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('GLB.js'), require('Btn.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB, global.Btn);
		global.GameHelpPanel2D = mod.exports;
	}
})(this, function (exports, _GLB, _Btn) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GameHelpPanel2D;

	var _GLB2 = _interopRequireDefault(_GLB);

	var _Btn2 = _interopRequireDefault(_Btn);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var UV = {
		x: 800 / 1024,
		y: 600 / 1024
	};
	var CAMERA_WIDTH = 20;
	var BILI = 800 / 600;

	function GameHelpPanel2D(game_scene) {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};
		var geometry = new THREE.PlaneGeometry(CAMERA_WIDTH, CAMERA_WIDTH / BILI, 1, 1);
		var material = new THREE.MeshBasicMaterial({ map: _GLB2.default.res["bg_help.png"] });
		material.transparent = true;

		var bricks = [new THREE.Vector2(0, UV.y), new THREE.Vector2(0, 0), new THREE.Vector2(UV.x, 0), new THREE.Vector2(UV.x, UV.y)];
		geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
		geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];
		var plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = Math.PI * 3 / 2;
		plane.position.set(0, 2, 0);
		this.MyAPI.bg = plane;
		this.add(this.MyAPI.bg);

		this.MyAPI.tip = new _Btn2.default("tip0.png", 400, 90, 512, 256);
		this.MyAPI.tip.rotation.x = Math.PI * 3 / 2;
		this.MyAPI.tip.position.set(0, 3, 5);
		this.add(this.MyAPI.tip);

		var btn = new _Btn2.default("btn_start.png", 170, 68, 256);
		btn.rotation.x = Math.PI * 3 / 2;
		btn.position.set(7.7, 2.1, 6.2); // 改变位置后，点击有问题
		this.MyAPI.btn = btn;
		btn.name = "btn_start";
		this.add(this.MyAPI.btn);

		var o_z = 8;
		var t_z = 5;
		var speed = 0.15;
		this.MyAPI.render = function () {
			this.MyAPI.tip.position.z += speed * (t_z - this.MyAPI.tip.position.z);
		};
		this.MyAPI.init = function () {
			this.MyAPI.tip.position.z = o_z;
			game_scene.addClickEvent(this.children, "btn_start", gameStart.bind(this));
		};
		this.MyAPI.showTip = function (index) {
			this.MyAPI.tip.position.z = o_z;
			this.MyAPI.tip.material.map = _GLB2.default.res["tip" + index + ".png"];
		};

		function gameStart() {
			_GLB2.default.changeScene({ type: "game_start" });
		}
	}
});