import GLB from 'GLB.js';
import GameHelpPanel3D from 'GameHelpPanel3D.js';
import GameHelpPanel2D from 'GameHelpPanel2D.js';


const W=GLB.W;
const H=GLB.H;
const ROTATION={
	x:-Math.PI/4,
	y:Math.PI/16,
	z:0,
}
const POSITION={
	x:-5,
	y:0,
	z:-1,
}

export default function GameHelpPanel(game_scene){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	
	this.MyAPI["2D"]=new GameHelpPanel2D(game_scene);
	this.MyAPI["3D"]=new GameHelpPanel3D();
	this.MyAPI["3D"].rotation.set(ROTATION.x,ROTATION.y,ROTATION.z);
	this.add(this.MyAPI["2D"]);
	this.add(this.MyAPI["3D"]);

	this.MyAPI.render=function(){
		this.MyAPI["2D"].MyAPI.render.bind(this.MyAPI["2D"])();
		this.MyAPI["3D"].MyAPI.render.bind(this.MyAPI["3D"])();
	}
	this.MyAPI.init=function(){
		this.MyAPI["2D"].MyAPI.init.bind(this.MyAPI["2D"])();
		this.MyAPI["3D"].MyAPI.init.bind(this.MyAPI["3D"])();

		var width_height=this.MyAPI["3D"].MyAPI.getCenter.bind(this.MyAPI["3D"])();
		var x=-width_height.x/2,
			y=POSITION.y,
			z=-1;
		this.MyAPI["3D"].position.set(x,POSITION.y,POSITION.z);
	}
	this.MyAPI.showTip=function(index){
		this.MyAPI["2D"].MyAPI.showTip.bind(this.MyAPI["2D"])(index);
	}





}