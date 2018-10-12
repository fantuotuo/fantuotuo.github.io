import GameScene2 from "GameScene2.js";
import Container from "Container.js";
var game_scene=new GameScene2();
var container=new Container();
game_scene.addToScene(container);

import Par from "Par.js";
const DX=10,DY=10;

const N=200;
let points=[];
const TXT_ARR=["qwert","yuiop"];
// const W=800;
// const H=600;
const W=window.innerWidth;
const H=window.innerHeight;

let index_txt=-1;
let positions=[];
let destinations=[];
let pars=[];

for(let i=0;i<N;i++){
	pars[i]=new Par(i);
	container.add(pars[i]);
}

function getData(){
	index_txt++;
	if(index_txt>=TXT_ARR.length){
		index_txt=0;
	}
	let txt=TXT_ARR[index_txt];
	positions[index_txt]=[];


	let canvas=document.createElement("canvas");
	canvas.width=W;
	canvas.height=H;
	let ctx=canvas.getContext("2d");
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,W,H);
	ctx.fillStyle="rgb(255,0,0)";
	ctx.textAlign="center";
	ctx.font="50px Microsoft YaHei";
	ctx.fillText(txt,400,150);
	let image_data=ctx.getImageData(0,0,W,H).data;
	for(let j=0;j<H;j++){
		for(let i=0;i<W;i++){
			if(image_data[(j*W+i)*4+0]>200){
				positions[index_txt].push({
					x:i*SCALE,
					y:j*SCALE,
				});
			}
		}
	}
	getDes();

	function getDes(){
		destinations[index_txt]=[];
		for(let i=0;i<pars.length;i++){
			let par=pars[i];
			let distances=[];
			let nearest=0;

			if(positions[index_txt].length>0){
				for(let j=0;j<positions[index_txt].length;j++){
					let position=positions[index_txt][j];
					distances[j]=Math.sqrt(Math.pow(position.x-par.o_x,2) + Math.pow(position.y-par.o_y,2));
					if(distances[j]<distances[nearest]){
						nearest=[j];
					}
				}

				let dx=positions[index_txt][nearest].x,
					dy=positions[index_txt][nearest].y;
				let p0=positions[index_txt][nearest];
				for(let j=0;j<positions[index_txt].length;j++){
					let p=positions[index_txt][j];
					if(p){
						let d=Math.sqrt(Math.pow(p.x-p0.x,2) + Math.pow(p.y-p0.y,2));
						if(d<=10){
							positions[index_txt].splice(j,1);
							j--;
						}
					}
				}

				destinations[index_txt][i]={
					dx,dy
				};


			}

		}
	}
	


	// $("#game-player").append(canvas)

}
	function getDes2(){
		index_txt++;
		if(index_txt>=TXT_ARR.length){
			index_txt=0;
		}

		for(let i=0;i<pars.length;i++){
			pars[i].alpha=0;
			if(destinations[index_txt][i]){
				pars[i].alpha=1;
				pars[i].dx=destinations[index_txt][i].dx;
				pars[i].dy=destinations[index_txt][i].dy;

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
		let c=0;
		function rend(){
			for(let i=0;i<pars.length;i++){
				let p=pars[i];
				p.x+=(p.dx - p.x)/10;
				p.y+=(p.dy - p.y)/10;
			}
			if(++c%200==0){
				getDes2();
			}
			requestAnimationFrame(rend);
		}
		rend();
	



// console.time("开始")

for(let i=0;i<TXT_ARR.length;i++){
	getData();
}
// console.timeEnd("开始")
index_txt=-1;
// getDes2();