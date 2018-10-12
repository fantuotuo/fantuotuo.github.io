(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', './out/GLB.js', './out/Btn.js', './out/BtnTxt.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('./out/GLB.js'), require('./out/Btn.js'), require('./out/BtnTxt.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB, global.Btn, global.BtnTxt);
		global.GameEndPanel = mod.exports;
	}
})(this, function (exports, _GLB, _Btn, _BtnTxt) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GameEndPanel;

	var _GLB2 = _interopRequireDefault(_GLB);

	var _Btn2 = _interopRequireDefault(_Btn);

	var _BtnTxt2 = _interopRequireDefault(_BtnTxt);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var W = 800;
	var H = 600;
	var BILI = 800 / 600;
	var UV = {
		x: 800 / 1024,
		y: 600 / 1024
	};
	var CAMERA_WIDTH = 20;
	function GameEndPanel(game_scene) {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};
		this.MyAPI.score = 0;
		var geometry = new THREE.PlaneGeometry(CAMERA_WIDTH, CAMERA_WIDTH / BILI, 1, 1);
		var material = new THREE.MeshBasicMaterial({ map: _GLB2.default.res["bg_end.png"] });

		var bricks = [new THREE.Vector2(0, UV.y), new THREE.Vector2(0, 0), new THREE.Vector2(UV.x, 0), new THREE.Vector2(UV.x, UV.y)];
		geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
		geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];

		var plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = Math.PI * 3 / 2;
		plane.position.set(0, -5, 0);
		this.MyAPI.bg = plane;
		this.add(this.MyAPI.bg);

		var btn = new _Btn2.default("btn_submit.png", 100, 42, 128);
		btn.rotation.x = Math.PI * 3 / 2;
		btn.position.set(0, 4, 5); // 改变位置后，点击有问题
		this.MyAPI.btn = btn;
		btn.name = "btn_submit";
		this.add(this.MyAPI.btn);

		function gameStart() {
			submitData(this.MyAPI.score);
			_GLB2.default.changeScene({ type: "game_init" });
		}
		this.MyAPI.level_txt = new _BtnTxt2.default("最高级别：-1");
		this.MyAPI.level_txt.position.z = -1;
		this.MyAPI.level_txt.name = "level_txt";
		this.add(this.MyAPI.level_txt);
		this.MyAPI.score_txt = new _BtnTxt2.default("分数：-1");
		this.MyAPI.score_txt.position.z = 1;
		this.MyAPI.score_txt.name = "score_txt";
		this.add(this.MyAPI.score_txt);

		this.MyAPI.render = function () {};
		this.MyAPI.init = function (data) {
			var level = data.level,
			    score = data.score;
			this.MyAPI.score = score;
			this.MyAPI.level_txt.MyAPI.freshTxt.bind(this.MyAPI.level_txt)("最高级别：" + (parseInt(level) + 1));
			this.MyAPI.score_txt.MyAPI.freshTxt.bind(this.MyAPI.score_txt)("分数：" + score);

			game_scene.addClickEvent(this.children, "btn_submit", gameStart.bind(this));
		};
		// game_scene.lookAt(new THREE.Vector3(0,0,0));
	}
});