import Btn from "Btn.js";
import BtnTxt from "BtnTxt.js";
const CAMERA_WIDTH=20;
const CAMERA_HEIGHT=16;
const BAR_BG_W=0.7*CAMERA_WIDTH;
const BAR_W=0.695*CAMERA_WIDTH;


export default function LoadUI(){
	this.__proto__=new THREE.Group();
	var geo=new THREE.PlaneGeometry(20,16);
	var mat=new THREE.MeshBasicMaterial();
	mat.map=new THREE.CanvasTexture(gene());
	var bg=new THREE.Mesh(geo,mat);
	bg.rotation.x=Math.PI*3/2;
	bg.position.y=0;
	this.add(bg);

	var logo=new Btn("loading_logo.png",230,230,256);
	logo.rotation.x=Math.PI*3/2;
	logo.position.y=2;
	logo.position.z=-1;
	this.add(logo);

	geo=new THREE.PlaneGeometry(BAR_BG_W,0.5);
	mat=new THREE.MeshBasicMaterial();
	mat.map=new THREE.CanvasTexture(gene("#000000"));
	var bar_bg=new THREE.Mesh(geo,mat);
	bar_bg.rotation.x=Math.PI*3/2;
	bar_bg.position.y=1;
	bar_bg.position.z=4.3;
	this.add(bar_bg);

	geo=new THREE.PlaneGeometry(BAR_W,0.4);
	mat=new THREE.MeshBasicMaterial();
	mat.map=new THREE.CanvasTexture(gene("#009900"));
	var bar=new THREE.Mesh(geo,mat);
	bar.rotation.x=Math.PI*3/2;
	bar.position.y=1.1;
	bar.position.z=4.3;
	this.add(bar);

	var txt=new BtnTxt("1213","#000000",1024,64,30,false);
	txt.position.y=2;
	txt.position.z=5.3;

	this.add(txt);

	function gene(c){
		c=c?c:"#888888"
		var canvas=document.createElement("canvas");
		var ctx=canvas.getContext("2d");
		canvas.width=64;
		canvas.height=64;

		ctx.fillStyle=c;
		ctx.fillRect(0,0,64,64);

		return canvas;
	}


	this.setProgress=function(current,total){
		var bili=current/total;
		var perc=Math.floor(100*bili);
		bar.scale.x=bili;
		var inter=(BAR_BG_W - BAR_W * bili)/2;
		bar.position.x=-(inter-(BAR_BG_W-BAR_W)/2);

		txt.MyAPI.freshTxt.bind(txt)("loading..."+perc+"%");
	}



}