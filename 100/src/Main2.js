import GameScene2 from "GameScene2.js";
import Container from "Container.js";
import Box0 from 'Box0.js';
import Box1 from 'Box1.js';
import GLB from 'GLB.js';

var game_scene=new GameScene2();
var container=new Container();
game_scene.addToScene(container);

import Par from "Par.js";
const DX=10,DY=10;



const N=200;
let points=[];
const TXT_ARR=["娟娟：送你","一个小礼物","你要每天都","开心的噢"];
const W=window.innerWidth;
const H=window.innerHeight;
const SCALE=1;
const SIZE=W/7;

let index_txt=-1;
let positions=[];
let destinations=[];
let pars=[];

for(let i=0;i<N;i++){
	pars[i]=new Par(i);
}
var arr=[
	"tip.png",
];
let total=arr.length;
loadRes();
function loadRes(){
	var count=-1;
	loadNext();

	function loadNext(){
		count++;
		if(count>=total){
			loadEnd();
		}else{
			new THREE.TextureLoader().load("./assets/"+arr[count],function (res){
				GLB.res[arr[count]]=res;
				loadNext();
			});
		}
	}
	function loadEnd(){
		loadSound();
	}
}
var arr_sound=[
	"m.mp3",
];
let total_sound=arr_sound.length;
function loadSound(){
	var count=-1;
	loadNext();
	function loadNext(){
		count++;
		if(count>=total_sound){
			loadEnd();
		}else{
			new THREE.AudioLoader().load("./assets/"+arr_sound[count],function(buffer){
				GLB.res[arr_sound[count]]=buffer;
				loadNext();
			})
		}
	}
	function loadEnd(){
		loadModel();
	}
}
var arr_model=[
	
	"box2","box5",
];
let total_model=arr_model.length;
function loadModel(){
	var count=-1;
	loadNext();
	function loadNext(){
		count++;
		if(count>=total_model){
			loadEnd();
		}else{
			var l=new THREE.MTLLoader();
			l.setBaseUrl("./assets/model/");
			l.setPath("./assets/model/");
			l.load(arr_model[count]+".mtl",function(materials){
				var loader=new THREE.OBJLoader();
				loader.setPath("./assets/model/");
				loader.setMaterials(materials);
				loader.load(arr_model[count]+".obj",function(obj){
					GLB.res[arr_model[count]]=obj;
					loadNext();
				});
			});
		}
	}
	function loadEnd(){
		addModel();
	}
}
let box0,box1;
let tip;
let sound;
function addModel(){
	box0=new Box0();
	box1=new Box1();

	container.add(box0);
	container.add(box1);

	for(let i=0;i<N;i++){
		container.add(pars[i]);
	}

	let geo=new THREE.PlaneGeometry(512,512);
	let mat=new THREE.MeshLambertMaterial({map:GLB.res["tip.png"]});
	mat.transparent=true;
	tip=new THREE.Mesh(geo,mat);
	tip.rotation.x=-Math.PI/2;
	game_scene.addToScene(tip);

	sound=new THREE.Audio(game_scene.listener);
	sound.setBuffer(GLB.res["m.mp3"]);

	document.onclick=function(){
		boxOpen();
	}
	document.ontouchend=function(){
		boxOpen();
	}

	window.loadEnd();
}






function getData(){
	index_txt++;
	if(index_txt>=TXT_ARR.length){
		index_txt=0;
	}
	let txt=TXT_ARR[index_txt];
	positions[index_txt]=[];


	let canvas=document.createElement("canvas");
	let c_w=Math.floor(W/SCALE),
		c_h=Math.floor(H/SCALE);
	canvas.width=c_w;
	canvas.height=c_h;
	let ctx=canvas.getContext("2d");
	ctx.fillStyle="rgb(0,0,0)";
	ctx.fillRect(0,0,c_w,c_h);
	ctx.fillStyle="rgb(255,0,0)";
	ctx.textAlign="center";
	ctx.font=SIZE+"px Microsoft YaHei";
	ctx.fillText(txt,c_w/2,SIZE*3);
	let image_data=ctx.getImageData(0,0,c_w,c_h).data;
	for(let j=0;j<c_h;j++){
		for(let i=0;i<c_w;i++){
			if(image_data[(j*c_w+i)*4+0]>200){
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
						if(d<=8){
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
	function getDes3(){
		index_txt++;
		if(index_txt>=TXT_ARR.length){
			index_txt=0;
		}

		let sta=true;
		for(let i=0;i<pars.length;i++){
			pars[i].alpha=0;
			if(destinations[index_txt][i]){
				pars[i].alpha=1;

				pars[i].setYanchi(destinations[index_txt][i].dx,destinations[index_txt][i].dy);

			}
		}
	}
		let start=false;
		let c=0;
		function rend(){
			for(let i=0;i<pars.length;i++){
				let p=pars[i];
				p.x+=(p.dx - p.x)/10;
				p.y+=(p.dy - p.y)/10;
			}
			container.start && c++;

			if(c>500 && c%300==0){
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
getDes3();

function boxOpen(){
	box1.startRotate(function(){
		container.start=true;
	});
	game_scene.lightOn();
	game_scene.remove(tip);
	sound.play();

	document.onclick=null;
	document.ontouchend=null;
}