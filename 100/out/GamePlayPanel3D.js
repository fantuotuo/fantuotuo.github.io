(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(['exports', 'GLB.js', 'Block.js', 'Pool.js', 'Case.js'], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require('GLB.js'), require('Block.js'), require('Pool.js'), require('Case.js'));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.GLB, global.Block, global.Pool, global.Case);
		global.GamePlayPanel3D = mod.exports;
	}
})(this, function (exports, _GLB, _Block, _Pool, _Case) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = GamePlayPanel3D;

	var _GLB2 = _interopRequireDefault(_GLB);

	var _Block2 = _interopRequireDefault(_Block);

	var _Pool2 = _interopRequireDefault(_Pool);

	var _Case2 = _interopRequireDefault(_Case);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function GamePlayPanel3D(s) {
		this.__proto__ = new THREE.Group();

		this.MyAPI = {};
		let cs = [];
		let ground;

		this.MyAPI.render = function () {
			for (let i = 0; i < cs.length; i++) {
				cs[i].MyAPI.render.bind(cs[i])();
			}
		};

		this.MyAPI.levelStart = function () {
			let geo = new THREE.PlaneGeometry(10, 10, 1, 1);
			let mat = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
			mat.side = THREE.DoubleSide;
			ground = new THREE.Mesh(geo, mat);
			this.add(ground);
			ground.rotation.set(Math.PI * 3 / 2, 0, 0);
			ground.receiveShadow = true;

			cs[0] = new _Case2.default();
			this.add(cs[0]);
			cs[0].MyAPI.setPos.bind(cs[0])({ x: 0.1, y: 0, z: 0.1 });
			cs[0].MyAPI.set.bind(cs[0])([[0, 0], [0, 1]]);

			cs[1] = new _Case2.default();
			this.add(cs[1]);
			cs[1].MyAPI.setPos.bind(cs[1])({ x: -2.1, y: 0, z: 0.1 });
			cs[1].MyAPI.set.bind(cs[1])([[0, 1], [0, 0]]);

			cs[0].MyAPI.startRotate.bind(cs[0])();
		};
	}
});