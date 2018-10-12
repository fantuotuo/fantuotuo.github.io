(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'Mask.js', 'GLB.js', 'Btn.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('Mask.js'), require('GLB.js'), require('Btn.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.Mask, global.GLB, global.Btn);
		global.GamePlayPanel2D = mod.exports;
	}
})(this, function (exports, _Mask, _GLB, _Btn) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GamePlayPanel2D;

	var _Mask2 = _interopRequireDefault(_Mask);

	var _GLB2 = _interopRequireDefault(_GLB);

	var _Btn2 = _interopRequireDefault(_Btn);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var BILI = 800 / 600;
	var UV = {
		x: 800 / 1024,
		y: 600 / 1024
	};
	var CAMERA_WIDTH = 20;
	var TXT_PRE = "步数：";
	var TXT_PRE_TIME = "剩余时间：";
	var BLACK_TEST = "rgba(0,0,0,0)";
	var BG_TXT = "rgba(0,255,255,0.7)";
	var COLOR_TXT = "rgba(255,0,0,1)";

	var SPRITE_WIDTH = 40; // sprite原本大小40px
	var SCALE_X = 16 * 64 / 40;
	var SCALE_Y = 64 / 40;

	function GamePlayPanel2D(game_scene) {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};

		var geometry = new THREE.PlaneGeometry(20, 20 / BILI, 1, 1);
		var material = new THREE.MeshBasicMaterial({ map: _GLB2.default.res["bg_play.png"] });
		var bricks = [new THREE.Vector2(0, UV.y), new THREE.Vector2(0, 0), new THREE.Vector2(UV.x, 0), new THREE.Vector2(UV.x, UV.y)];
		geometry.faceVertexUvs[0][0] = [bricks[0], bricks[1], bricks[3]];
		geometry.faceVertexUvs[0][1] = [bricks[1], bricks[2], bricks[3]];
		var plane = new THREE.Mesh(geometry, material);
		plane.rotation.x = Math.PI * 3 / 2;
		plane.position.set(0, -10, 0);
		this.MyAPI.bg = plane;
		this.add(this.MyAPI.bg);

		// 显示关卡编号
		var mask = new _Mask2.default();
		this.add(mask);

		var txt_sprite;
		var txt_material = new THREE.SpriteMaterial();
		txt_sprite = new THREE.Sprite(txt_material);
		txt_sprite.position.set(0, 15, -6.7);
		txt_sprite.scale.set(SCALE_X, SCALE_Y, 1);
		// this.add(txt_sprite);
		this.MyAPI.freshTxt = function (num, time) {
			var txt_num = TXT_PRE + num;
			var txt_time = TXT_PRE_TIME + time;
			txt_material.map = new THREE.CanvasTexture(generateSprite(txt_num, txt_time));
		};

		var btn = new _Btn2.default("button1.png", 25, 25, 32);
		btn.rotation.x = Math.PI * 3 / 2;
		btn.position.set(9.2, 3, 6.8);
		this.MyAPI.btn = btn;
		btn.name = "btn_help";
		this.add(this.MyAPI.btn);

		this.MyAPI.addClick = function () {
			game_scene.addClickEvent(this.children, "btn_help", gameHelp.bind(this));
		};
		this.MyAPI.levelStart = function () {
			mask.visible = false;
		};
		this.MyAPI.levelStartPre = function (level) {
			mask.MyAPI.showTxt("关卡" + (parseInt(level) + 1));
			mask.visible = true;
		};
		this.MyAPI.levelEnd = function () {};
		this.MyAPI.render = function () {};

		function gameHelp(obj) {
			_GLB2.default.changeScene({ "type": "game_help" });
		}

		function generateSprite(txt_num, txt_time) {
			var canvas = document.createElement('canvas');
			canvas.width = 1024;
			canvas.height = 64;

			var context = canvas.getContext('2d');
			context.fillStyle = BLACK_TEST;
			context.fillRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = BG_TXT;
			// context.fillRect(0,0,1024,40);
			context.fillStyle = COLOR_TXT;
			context.font = '26px Microsoft YaHei';
			context.fillText(txt_num, 770, 26);
			context.fillText(txt_time, 400, 26);
			return canvas;
		}
	}
});