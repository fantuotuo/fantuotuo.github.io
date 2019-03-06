import GLB from './out/GLB.js';
import Btn from './out/Btn.js';
const W=GLB.W;
const H=GLB.H;
const BILI=W/H;
const CAMERA_WIDTH=20;

export default function GameStartPanel(game_scene){
	this.__proto__=new THREE.Group();
	this.position.set(0,0,-4);

	this.MyAPI={};

	var scale=0.03;
	var baohe=GLB.res["baohe.fbx"];
	baohe.scale.set(scale,scale,scale);
	GLB.shadowEnable(baohe,0);
	GLB.shadowEnable(baohe,1);
	GLB.lowReflect(baohe);
	this.add(baohe);
	// var mat=new THREE.MeshLambertMaterial({color:0xff0000})
	// var a=new THREE.Mesh(new THREE.CubeGeometry(1,1,1),mat);
	// this.add(a);
	// a.position.set(0,0,8);
	// a.castShadow=true;
	// a.receiveShadow=true;
	// var b=new THREE.Mesh(new THREE.CubeGeometry(5,5,1),mat);
	// this.add(b);
	// b.position.set(0,0,6);
	// b.castShadow=true;
	// // a.receiveShadow=true;

	var floors=[];
	var g0,
		g1=GLB.res["g1.fbx"];
	var g1c=g1.children[0];
	var off=-4.6;
	g1c.position.set(0,off/scale,0);
	g1.position.set(0,-off,1.9*scale/0.03);
	g1.castShadow=true;g1.receiveShadow=true;
	g1.scale.set(scale,scale,scale);
	GLB.shadowEnable(g1,0);
	GLB.shadowEnable(g1,1);
	GLB.lowReflect(g1);
	this.add(g1);
	for(let i=0;i<baohe.children.length;i++){
		let obj=baohe.children[i];
		switch(obj.name){
			case "p0":
				floors[0]=obj;
				obj.visible=true;
				break;
			case "p1":
				floors[1]=obj;
				obj.visible=false;
				break;
			case "p2":
				floors[2]=obj;
				obj.visible=false;
				break;
			case "p3":
				floors[3]=obj;
				obj.visible=false;
				break;
			case "p4":
				floors[4]=obj;
				obj.visible=false;
				break;
			case "g0":
				g0=obj;
				break;
			case "g1":
				// baohe.remove(obj);
				obj.visible=false;
				break;
		}
	}

	var z=2;
	var g_plus=-0.03,
		p_r_arr=[0,0,0,0,0,0],
		p_z_arr=[0,0,0,0,0,0],
		z_max_arr=[0.9,1.5,1.5,1.5,2.4],
		r_plus_arr=[0.001,-0.002,0.002,-0.002,0.002],
		z_plus=0.01;

	this.MyAPI.init=function(){
		var s=new THREE.Audio(game_scene.listener);
		s.setBuffer(GLB.res["m.mp3"]);
		s.play();

		init();
	}
	var r=0;
	var current_index=-1;
	this.MyAPI.render=function(timestamp){
		if(r>-90*Math.PI/180){
			r+=g_plus;
		}else{
			gEnd();
		}
		g1.rotation.x=r;

		p();

		let p_z=0,
			p_r=0;
		for(let i=0;i<floors.length;i++){
			p_z+=p_z_arr[i];
			p_r+=p_r_arr[i];
			floors[i].position.set(0,0,(p_z+z)/scale);
			floors[i].rotation.set(0,0,p_r);
		}

	}

	function init(){
		p_r_arr=[0,0,0,0,0,0];
		p_z_arr=[-0.6,-0.1,-0.1,-0.1,-0.1,-0.1];
	}
	function gEnd(){
		if(current_index!=-1) return;
		// pBegin(1);
	}
	function pBegin(index){
		current_index=index;
	}
	function pEnd(index){
		if(index<4){
			pBegin(index+1);
		}else{
			pBegin(5);
		}
	}
	function p(){
		if(current_index>=0){
			if(current_index<=4){
				p_z_arr[current_index]+=z_plus;
				if(p_z_arr[current_index]>z_max_arr[current_index]){
					pEnd(current_index);
				}
			}

			for(let i=0;i<current_index;i++){
				p_r_arr[i]+=r_plus_arr[i];
			}
		}
	}
}