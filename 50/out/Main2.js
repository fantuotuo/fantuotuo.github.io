(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["GameScene2.js", "Container.js", "Box0.js", "Box1.js", "GLB.js", "Par.js"], factory);
	} else if (typeof exports !== "undefined") {
		factory(require("GameScene2.js"), require("Container.js"), require("Box0.js"), require("Box1.js"), require("GLB.js"), require("Par.js"));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.GameScene2, global.Container, global.Box0, global.Box1, global.GLB, global.Par);
		global.Main2 = mod.exports;
	}
})(this, function (_GameScene, _Container, _Box, _Box3, _GLB, _Par) {
	"use strict";

	var _GameScene2 = _interopRequireDefault(_GameScene);

	var _Container2 = _interopRequireDefault(_Container);

	var _Box2 = _interopRequireDefault(_Box);

	var _Box4 = _interopRequireDefault(_Box3);

	var _GLB2 = _interopRequireDefault(_GLB);

	var _Par2 = _interopRequireDefault(_Par);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var game_scene = new _GameScene2.default();
	var container = new _Container2.default();
	game_scene.addToScene(container);

	const DX = 10,
	      DY = 10;

	const N = 50;
	let points = [];
	const TXT_ARR = ["天天", "开心"];
	const W = window.innerWidth;
	const H = window.innerHeight;
	const SCALE = 2;

	let index_txt = -1;
	let positions = [];
	let destinations = [];
	let pars = [];

	for (let i = 0; i < N; i++) {
		pars[i] = new _Par2.default(i);
		container.add(pars[i]);
	}
	var arr_model = ["box", "box2"];
	let total_model = arr_model.length;
	loadModel();
	function loadModel() {
		var count = -1;
		loadNext();
		function loadNext() {
			count++;
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
			addModel();
		}
	}
	function addModel() {
		let box0 = new _Box2.default();
		let box1 = new _Box4.default();

		container.add(box0);
		container.add(box1);
	}

	function getData() {
		index_txt++;
		if (index_txt >= TXT_ARR.length) {
			index_txt = 0;
		}
		let txt = TXT_ARR[index_txt];
		positions[index_txt] = [];

		let canvas = document.createElement("canvas");
		let c_w = Math.floor(W / SCALE),
		    c_h = Math.floor(H / SCALE);
		canvas.width = c_w;
		canvas.height = c_h;
		let ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, c_w, c_h);
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.textAlign = "center";
		ctx.font = "150px Microsoft YaHei";
		ctx.fillText(txt, 400, 150);
		let image_data = ctx.getImageData(0, 0, c_w, c_h).data;
		for (let j = 0; j < c_h; j++) {
			for (let i = 0; i < c_w; i++) {
				if (image_data[(j * c_w + i) * 4 + 0] > 200) {
					positions[index_txt].push({
						x: i * SCALE,
						y: j * SCALE
					});
				}
			}
		}
		getDes();

		function getDes() {
			destinations[index_txt] = [];
			for (let i = 0; i < pars.length; i++) {
				let par = pars[i];
				let distances = [];
				let nearest = 0;

				if (positions[index_txt].length > 0) {
					for (let j = 0; j < positions[index_txt].length; j++) {
						let position = positions[index_txt][j];
						distances[j] = Math.sqrt(Math.pow(position.x - par.o_x, 2) + Math.pow(position.y - par.o_y, 2));
						if (distances[j] < distances[nearest]) {
							nearest = [j];
						}
					}

					let dx = positions[index_txt][nearest].x,
					    dy = positions[index_txt][nearest].y;
					let p0 = positions[index_txt][nearest];
					for (let j = 0; j < positions[index_txt].length; j++) {
						let p = positions[index_txt][j];
						if (p) {
							let d = Math.sqrt(Math.pow(p.x - p0.x, 2) + Math.pow(p.y - p0.y, 2));
							if (d <= 40) {
								positions[index_txt].splice(j, 1);
								j--;
							}
						}
					}

					destinations[index_txt][i] = {
						dx, dy
					};
				}
			}
		}

		// $("#game-player").append(canvas)
	}
	function getDes2() {
		index_txt++;
		if (index_txt >= TXT_ARR.length) {
			index_txt = 0;
		}

		for (let i = 0; i < pars.length; i++) {
			pars[i].alpha = 0;
			if (destinations[index_txt][i]) {
				pars[i].alpha = 1;
				pars[i].dx = destinations[index_txt][i].dx;
				pars[i].dy = destinations[index_txt][i].dy;
			}
		}
	}
	function getDes3() {
		index_txt++;
		if (index_txt >= TXT_ARR.length) {
			index_txt = 0;
		}

		let sta = true;
		for (let i = 0; i < pars.length; i++) {
			pars[i].alpha = 0;
			if (destinations[index_txt][i]) {
				pars[i].alpha = 1;

				pars[i].setYanchi(destinations[index_txt][i].dx, destinations[index_txt][i].dy);
			}
		}
	}
	let start = false;
	let c = 0;
	function rend() {
		for (let i = 0; i < pars.length; i++) {
			let p = pars[i];
			p.x += (p.dx - p.x) / 10;
			p.y += (p.dy - p.y) / 10;
		}
		container.start && c++;

		if (c > 500 && c % 300 == 0) {
			getDes2();
		}
		requestAnimationFrame(rend);
	}
	rend();

	// console.time("开始")

	for (let i = 0; i < TXT_ARR.length; i++) {
		getData();
	}
	// console.timeEnd("开始")
	index_txt = -1;
	getDes3();
	document.onclick = function () {
		container.start = true;
	};
});