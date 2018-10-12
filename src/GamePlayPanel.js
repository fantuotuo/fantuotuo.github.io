import GamePlayPanel3D from 'GamePlayPanel3D.js';
import GamePlayPanel2D from 'GamePlayPanel2D.js';
import GLB from './out/GLB.js';

const ROTATION={
	x:-Math.PI*2/8,
	y:0,
	z:0,
}
const POSITION={
	x:-5,
	y:0,
	z:-1,
}

const DELAY=1000;
const DELAY1=2000;

const BASE_SCORE_M=100;
const K_M=2;
const K_T=2;
const MAX_TIME=60;
const MAX_WRONG=3;
const PWD="lw3728";

var max_time_variable 		=MAX_TIME*1;
var base_score_m_variable	=BASE_SCORE_M*1;
var k_t_variable			=K_T*1;
var pre_txt_time			=-1;				// 先前刷新的时间值，如果相同，则防止重绘
var pre_txt_moves			=-1;				// 先前刷新的move值，如果相同，则防止重绘

export default function GamePlayPanel(game_scene){
	this.__proto__=new THREE.Group();
	var timeout_id=null;

	this.MyAPI={};
	this.MyAPI["2D"]=new GamePlayPanel2D(game_scene);
	this.add(this.MyAPI["2D"]);
	this.MyAPI["3D"]=new GamePlayPanel3D(game_scene);
	this.add(this.MyAPI["3D"]);
	this.MyAPI["3D"].rotation.set(ROTATION.x,ROTATION.y,ROTATION.z);

	this.MyAPI.init=function(){
		this.MyAPI.level=0;

		this.MyAPI.levelStartPre.bind(this)();
		timeout_id && clearTimeout(timeout_id);
	}

	this.MyAPI.levelStartPre=function(){
		this.MyAPI["2D"].MyAPI.levelStartPre.bind(this.MyAPI["2D"])(this.MyAPI.level);
		setTimeout(this.MyAPI.levelStart.bind(this),500);
	}
	this.MyAPI.levelStart=function(){
		this.MyAPI["2D"].MyAPI.levelStart.bind(this.MyAPI["2D"])();
		this.MyAPI["3D"].MyAPI.levelStart.bind(this.MyAPI["3D"])();
	}
	this.MyAPI.render=function(){
		this.MyAPI["3D"].MyAPI.render.bind(this.MyAPI["3D"])();
		this.MyAPI["2D"].MyAPI.render.bind(this.MyAPI["2D"])();
		// this.MyAPI["3D"].rotation.x+=0.01
		
	}
}