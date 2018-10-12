(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['../out/GameScene.js', 'BtnTxt.js', '../out/GamePlayPanel.js', '../out/GameStartPanel.js', '../out/GameEndPanel.js', 'GameHelpPanel.js', '../out/GLB.js', 'LoadUI.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(require('../out/GameScene.js'), require('BtnTxt.js'), require('../out/GamePlayPanel.js'), require('../out/GameStartPanel.js'), require('../out/GameEndPanel.js'), require('GameHelpPanel.js'), require('../out/GLB.js'), require('LoadUI.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.GameScene, global.BtnTxt, global.GamePlayPanel, global.GameStartPanel, global.GameEndPanel, global.GameHelpPanel, global.GLB, global.LoadUI);
		global.Main = mod.exports;
	}
})(this, function (_GameScene, _BtnTxt, _GamePlayPanel, _GameStartPanel, _GameEndPanel, _GameHelpPanel, _GLB, _LoadUI) {
	'use strict';

	var _GameScene2 = _interopRequireDefault(_GameScene);

	var _BtnTxt2 = _interopRequireDefault(_BtnTxt);

	var _GamePlayPanel2 = _interopRequireDefault(_GamePlayPanel);

	var _GameStartPanel2 = _interopRequireDefault(_GameStartPanel);

	var _GameEndPanel2 = _interopRequireDefault(_GameEndPanel);

	var _GameHelpPanel2 = _interopRequireDefault(_GameHelpPanel);

	var _GLB2 = _interopRequireDefault(_GLB);

	var _LoadUI2 = _interopRequireDefault(_LoadUI);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var DELAY = 200;

	var game_scene = new _GameScene2.default();
	_GLB2.default.game_scene = game_scene;
	var manager = game_scene.manager;

	var arr = ["bg_mask.png", "bg_start.png", "bg_end.png", "bg_play.png", "box.png", "btn_start.png", "btn_submit.png", "btn_help.png", "floor.png", "floor0.png", "floor2.png", "floor4.png", "floor6.png", "bg_help.png", "tip0.png", "tip1.png", "tip10.png", "tip20.png", "button1.png", "pics4-1.png"];
	var arr_sound = ["down.mp3", "jump.mp3", "pass.mp3", "fragile.mp3", "open.mp3"];
	var arr_model = ["floor1", "floor3", "floor7", "case", "block", "pool", "case1", "obj1", "obj2"];

	var total = arr.length;
	var total_sound = arr_sound.length;
	var total_model = arr_model.length;
	var loadUI;

	function loadRes() {
		var count = -1;
		loadNext();

		function loadNext() {
			count++;
			loadUI.setProgress.bind(loadUI)(count, total + total_sound + total_model);
			if (count >= total) {
				loadEnd();
			} else {
				new THREE.TextureLoader(manager).load("./assets/" + arr[count], function (res) {
					_GLB2.default.res[arr[count]] = res;
					loadNext();
				});
			}
		}
		function loadEnd() {
			loadSound();
		}
	}
	function loadSound() {
		var count = -1;
		loadNext();
		function loadNext() {
			count++;
			loadUI.setProgress.bind(loadUI)(total + count, total + total_sound + total_model);
			if (count >= total_sound) {
				loadEnd();
			} else {
				new THREE.AudioLoader().load("./assets/" + arr_sound[count], function (buffer) {
					_GLB2.default.res[arr_sound[count]] = buffer;
					loadNext();
				});
			}
		}
		function loadEnd() {
			loadModel();
		}
	}
	function loadModel() {
		var count = -1;
		loadNext();
		function loadNext() {
			count++;
			loadUI.setProgress.bind(loadUI)(total + total_sound + count, total + total_sound + total_model);
			if (count >= total_model) {
				loadEnd();
			} else {
				var l = new THREE.MTLLoader();
				l.setBaseUrl("./assets/model/");
				l.setPath("./assets/model/");
				l.load(arr_model[count] + ".mtl", function (materials) {
					var loader = new THREE.OBJLoader();
					loader.setPath("./assets/model/");
					loader.setMaterials(materials);
					loader.load(arr_model[count] + ".obj", function (obj) {
						_GLB2.default.res[arr_model[count]] = obj;
						loadNext();
					});
				});
			}
		}
		function loadEnd() {
			setTimeout(init, DELAY);
		}
	}
	new THREE.TextureLoader(manager).load("./assets/loading_logo.png", function (res) {
		_GLB2.default.res["loading_logo.png"] = res;
		loadUI = new _LoadUI2.default();
		game_scene.addToScene(loadUI);
		loadRes();
	});

	var game_play_panel;
	var game_start_panel;
	var game_end_panel;
	var game_help_panel;
	function init() {
		// ios上解决无法播放的问题
		var s = new THREE.Audio(game_scene.listener);
		s.setBuffer(_GLB2.default.res["open.mp3"]);
		function ios_sound_start() {
			s.play();
			s.stop();
			document.removeEventListener("touchstart", ios_sound_start);
		}
		document.addEventListener("touchstart", ios_sound_start);

		game_scene.removeFromScene(loadUI);
		game_play_panel = new _GamePlayPanel2.default(game_scene);
		game_start_panel = new _GameStartPanel2.default(game_scene);
		game_end_panel = new _GameEndPanel2.default(game_scene);
		game_help_panel = new _GameHelpPanel2.default(game_scene);

		game_scene.addToScene(game_start_panel);
		game_start_panel.MyAPI.init.bind(game_start_panel)();
	}

	_GLB2.default.changeScene = function (obj) {
		if (_GLB2.default.handler_timeout) {
			clearTimeout(_GLB2.default.handler_timeout);
		}
		game_scene.removeFromScene(game_start_panel);
		game_scene.removeFromScene(game_play_panel);
		game_scene.removeFromScene(game_end_panel);
		game_scene.removeFromScene(game_help_panel);

		if (obj.type == "game_start") {
			game_play_panel.MyAPI.init.bind(game_play_panel)();
			game_scene.addToScene(game_play_panel);
		} else if (obj.type == "game_over") {
			game_end_panel.MyAPI.init.bind(game_end_panel)(obj.data);
			game_scene.addToScene(game_end_panel);
		} else if (obj.type == "game_init") {
			game_start_panel.MyAPI.init.bind(game_start_panel)();
			game_scene.addToScene(game_start_panel);
		} else if (obj.type == "game_help") {
			game_help_panel.MyAPI.init.bind(game_help_panel)();
			game_scene.addToScene(game_help_panel);
		}
	};
});