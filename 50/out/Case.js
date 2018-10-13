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
		global.Case = mod.exports;
	}
})(this, function (exports, _GLB) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = Case;

	var _GLB2 = _interopRequireDefault(_GLB);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function Case() {
		this.__proto__ = new THREE.Group();

		let c,
		    objs = [];
		let p = { x: 0, y: 0, z: 0 };
		let ang = -1;

		this.MyAPI = {};
		this.MyAPI.setPos = function (pos) {
			p = pos;
			this.position.set(p.x, p.y, p.z);
		};
		this.MyAPI.set = function (mat, pos) {
			c = _GLB2.default.res['case1'].clone();
			c.children[0].receiveShadow = true;
			c.children[0].castShadow = true;
			this.add(c);
			c.children[0].material.transparent = true;

			for (let i = 0; i < mat.length; i++) {
				for (let j = 0; j < mat[i].length; j++) {
					if (mat[i][j] == 1) {
						let obj = _GLB2.default.res["obj2"].clone();
						obj.position.set(j, 0.2, i);
						obj.children[0].castShadow = true;
						obj.children[0].receiveShadow = true;
						this.add(obj);
						objs.push(obj);
					}
				}
			}
		};
		this.MyAPI.render = function () {
			if (ang != -1) {
				if (this.rotation.z < ang) {
					c.children[0].material.opacity = 0.2;
					this.rotation.z += 0.03;
				}
			}
		};
		this.MyAPI.startRotate = function () {
			initPos.bind(this)();
			ang = Math.PI;
		};

		function initPos() {
			let off = { x: 0.1, y: -0.4, z: 0.1 };
			c.position.x += off.x;
			c.position.y += off.y;
			c.position.z += off.z;
			for (let i = 0; i < objs.length; i++) {
				objs[i].position.x += off.x;
				objs[i].position.y += off.y;
				objs[i].position.z += off.z;
			}
			this.position.x -= off.x;
			this.position.y -= off.y;
			this.position.z -= off.z;
		}
	}
});