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
import BtnTxt from './out/BtnTxt.js';

export default function GameEndPanel(game_scene){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	this.MyAPI.score=0;
	var geometry = new THREE.PlaneGeometry( CAMERA_WIDTH, CAMERA_WIDTH/BILI, 1,1 );
	var material = new THREE.MeshBasicMaterial( {map:GLB.res["bg_end.png"]} );

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
	this.add(this.MyAPI.bg);

	var btn=new Btn("btn_submit.png",100,42,128);
	btn.rotation.x=Math.PI*3/2;
	btn.position.set(0,4,5);					// 改变位置后，点击有问题
	this.MyAPI.btn=btn;
	btn.name="btn_submit";
	this.add(this.MyAPI.btn);

	function gameStart(){
		submitData(this.MyAPI.score);
		GLB.changeScene({type:"game_init"});
	}
	this.MyAPI.level_txt=new BtnTxt("最高级别：-1");
	this.MyAPI.level_txt.position.z=-1;
	this.MyAPI.level_txt.name="level_txt";
	this.add(this.MyAPI.level_txt);
	this.MyAPI.score_txt=new BtnTxt("分数：-1");
	this.MyAPI.score_txt.position.z=1;
	this.MyAPI.score_txt.name="score_txt";
	this.add(this.MyAPI.score_txt);

	this.MyAPI.render=function(){

	}
	this.MyAPI.init=function(data){
		var level=data.level,
			score=data.score;
		this.MyAPI.score=score;
		this.MyAPI.level_txt.MyAPI.freshTxt.bind(this.MyAPI.level_txt)("最高级别："+(parseInt(level)+1));
		this.MyAPI.score_txt.MyAPI.freshTxt.bind(this.MyAPI.score_txt)("分数："+score);

		game_scene.addClickEvent(this.children,"btn_submit",gameStart.bind(this));
	}
	// game_scene.lookAt(new THREE.Vector3(0,0,0));

}