import GLB from 'GLB.js';
import Btn from 'Btn.js';

const UV={
	x:800/1024,
	y:600/1024,
}
const CAMERA_WIDTH=20;
const BILI=800/600;


export default function GameHelpPanel2D(game_scene){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	var geometry = new THREE.PlaneGeometry( CAMERA_WIDTH, CAMERA_WIDTH/BILI, 1,1 );
	var material = new THREE.MeshBasicMaterial( {map:GLB.res["bg_help.png"]} );
	material.transparent=true;

	var bricks = [
		new THREE.Vector2(0, UV.y),
		new THREE.Vector2(0, 0),
		new THREE.Vector2(UV.x, 0),
		new THREE.Vector2(UV.x, UV.y),
	];
	geometry.faceVertexUvs[0][0] = [ bricks[0], bricks[1], bricks[3] ];
	geometry.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];
	var plane = new THREE.Mesh( geometry, material );
	plane.rotation.x=Math.PI*3/2;
	plane.position.set(0,2,0);
	this.MyAPI.bg=plane;
	this.add(this.MyAPI.bg);

	this.MyAPI.tip=new Btn("tip0.png",400,90,512,256);
	this.MyAPI.tip.rotation.x=Math.PI*3/2;
	this.MyAPI.tip.position.set(0,3,5);
	this.add(this.MyAPI.tip);

	var btn=new Btn("btn_start.png",170,68,256);
	btn.rotation.x=Math.PI*3/2;
	btn.position.set(7.7,2.1,6.2);					// 改变位置后，点击有问题
	this.MyAPI.btn=btn;
	btn.name="btn_start";
	this.add(this.MyAPI.btn);

	var o_z=8;
	var t_z=5;
	var speed=0.15;
	this.MyAPI.render=function(){
		this.MyAPI.tip.position.z+=speed*(t_z-this.MyAPI.tip.position.z);
	}
	this.MyAPI.init=function(){
		this.MyAPI.tip.position.z=o_z;
		game_scene.addClickEvent(this.children,"btn_start",gameStart.bind(this));
	}
	this.MyAPI.showTip=function(index){
		this.MyAPI.tip.position.z=o_z;
		this.MyAPI.tip.material.map=GLB.res["tip"+index+".png"];
	}

	function gameStart(){
		GLB.changeScene({type:"game_start"});
	}


}