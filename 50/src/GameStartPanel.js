const W=800;
const H=600;
const BILI=800/600;
const UV={
	x:800/1024,
	y:600/1024,
}
const CAMERA_WIDTH=20;
import GLB from './out/GLB.js';
import Btn from './out/Btn.js';

export default function GameStartPanel(game_scene){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	var geometry = new THREE.PlaneGeometry( CAMERA_WIDTH, CAMERA_WIDTH/BILI, 1,1 );
	var material = new THREE.MeshBasicMaterial( {map:GLB.res["bg_start.png"]} );

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
	plane.position.set(0,-5,0);
	this.MyAPI.bg=plane;
	// this.add(this.MyAPI.bg);

	var btn=new Btn("btn_start.png",170,68,256);
	btn.rotation.x=Math.PI*3/2;
	btn.position.set(4,3,5);					// 改变位置后，点击有问题
	this.MyAPI.btn=btn;
	btn.name="btn_start";
	this.add(this.MyAPI.btn);

	var btn_help=new Btn("btn_help.png",255,68,256);
	btn_help.rotation.x=Math.PI*3/2;
	btn_help.position.set(-4,3,5);
	this.MyAPI.btn_help=btn_help;
	btn_help.name="btn_help";
	this.add(this.MyAPI.btn_help);

	this.MyAPI.init=function(){
		game_scene.addClickEvent(this.children,"",checkClick.bind(this));
	}

	function checkClick(obj){
		if(obj.name=="btn_start"){
			gameStart.bind(this)();
			return true;
		}else if(obj.name=="btn_help"){
			gameHelp.bind(this)();
			return true;
		}
		return false;
	}

	function gameStart(){
		GLB.changeScene({type:"game_start"});
	}
	function gameHelp(){
		GLB.changeScene({type:"game_help"});
	}

	// game_scene.lookAt(new THREE.Vector3(0,0,0));

}