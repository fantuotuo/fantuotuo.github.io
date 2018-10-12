(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["GameScene2.js", "Container.js", "Par.js"], factory);
	} else if (typeof exports !== "undefined") {
		factory(require("GameScene2.js"), require("Container.js"), require("Par.js"));
	} else {
		var mod = {
			exports: {}
		};
		factory(global.GameScene2, global.Container, global.Par);
		global.Main2 = mod.exports;
	}
})(this, function (_GameScene, _Container, _Par) {
	"use strict";

	var _GameScene2 = _interopRequireDefault(_GameScene);

	var _Container2 = _interopRequireDefault(_Container);

	var _Par2 = _interopRequireDefault(_Par);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var game_scene = new _GameScene2.default();
	var container = new _Container2.default();
	game_scene.addToScene(container);

	var DX = 10,
	    DY = 10;

	var N = 200;
	var points = [];
	var TXT_ARR = ["qwert", "yuiop"];
	var W = 800;
	var H = 600;
	var SCALE = 1;

	var index_txt = -1;
	var positions = [];
	var destinations = [];
	var pars = [];

	for (var i = 0; i < N; i++) {
		pars[i] = new _Par2.default(i);
		container.add(pars[i]);
	}

	function getData() {
		index_txt++;
		if (index_txt >= TXT_ARR.length) {
			index_txt = 0;
		}
		var txt = TXT_ARR[index_txt];
		positions[index_txt] = [];

		var canvas = document.createElement("canvas");
		canvas.width = W;
		canvas.height = H;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "rgb(0,0,0)";
		ctx.fillRect(0, 0, W, H);
		ctx.fillStyle = "rgb(255,0,0)";
		ctx.textAlign = "center";
		ctx.font = "50px Microsoft YaHei";
		ctx.fillText(txt, 400, 150);
		var image_data = ctx.getImageData(0, 0, W, H).data;
		for (var j = 0; j < H; j++) {
			for (var _i = 0; _i < W; _i++) {
				if (image_data[(j * W + _i) * 4 + 0] > 200) {
					positions[index_txt].push({
						x: _i * SCALE,
						y: j * SCALE
					});
				}
			}
		}
		getDes();

		function getDes() {
			destinations[index_txt] = [];
			for (var _i2 = 0; _i2 < pars.length; _i2++) {
				var par = pars[_i2];
				var distances = [];
				var nearest = 0;

				if (positions[index_txt].length > 0) {
					for (var _j = 0; _j < positions[index_txt].length; _j++) {
						var position = positions[index_txt][_j];
						distances[_j] = Math.sqrt(Math.pow(position.x - par.o_x, 2) + Math.pow(position.y - par.o_y, 2));
						if (distances[_j] < distances[nearest]) {
							nearest = [_j];
						}
					}

					var dx = positions[index_txt][nearest].x,
					    dy = positions[index_txt][nearest].y;
					var p0 = positions[index_txt][nearest];
					for (var _j2 = 0; _j2 < positions[index_txt].length; _j2++) {
						var p = positions[index_txt][_j2];
						if (p) {
							var d = Math.sqrt(Math.pow(p.x - p0.x, 2) + Math.pow(p.y - p0.y, 2));
							if (d <= 10) {
								positions[index_txt].splice(_j2, 1);
								_j2--;
							}
						}
					}

					destinations[index_txt][_i2] = {
						dx: dx, dy: dy
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

		for (var _i3 = 0; _i3 < pars.length; _i3++) {
			pars[_i3].alpha = 0;
			if (destinations[index_txt][_i3]) {
				pars[_i3].alpha = 1;
				pars[_i3].dx = destinations[index_txt][_i3].dx;
				pars[_i3].dy = destinations[index_txt][_i3].dy;
			}
		}
	}

	// let canvas = document.createElement("canvas");
	// canvas.width=W;
	// canvas.height=H;
	// let ctx=canvas.getContext("2d");
	// $("#game-player").append(canvas);

	// let c=0;
	// function rend(){
	// 	ctx.clearRect(0,0,W,H);
	// 	ctx.fillStyle="rgb(0,255,0)";
	// 	for(let i=0;i<pars.length;i++){
	// 		if(!pars[i].alpha){
	// 			continue;
	// 		}
	// 		ctx.beginPath();
	// 		let p=pars[i];
	// 		ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
	// 		ctx.fill();
	// 		p.x+=(p.dx - p.x)/10;
	// 		p.y+=(p.dy - p.y)/10;
	// 	}
	// 	if(++c%500==0){
	// 		getDes2();
	// 	}
	// }
	// rend();
	var c = 0;
	function rend() {
		for (var _i4 = 0; _i4 < pars.length; _i4++) {
			var p = pars[_i4];
			p.x += (p.dx - p.x) / 10;
			p.y += (p.dy - p.y) / 10;
		}
		if (++c % 200 == 0) {
			getDes2();
		}
		requestAnimationFrame(rend);
	}
	rend();

	// console.time("开始")

	for (var _i5 = 0; _i5 < TXT_ARR.length; _i5++) {
		getData();
	}
	// console.timeEnd("开始")
	index_txt = -1;
	// getDes2();
});