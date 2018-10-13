import GLB from 'GLB.js';
const W=window.innerWidth;
const H=window.innerHeight;
const B_H=120;
const B_W=200;
const SPEED=100;
const DEPTH=80;
const OFFSET=100;
export default function Box1(){
	this.__proto__=new THREE.Group();

	let o=GLB.res["box2"];
	this.add(o);
	o.position.y=B_W/2;
	o.rotation.y=Math.PI/2;
	o.rotation.x=-Math.PI/2;

	this.position.x=W/2;
	this.position.z=-B_H + H/2 +DEPTH +OFFSET;
	this.position.y=-B_W/2;

	let r=-1;
	let rotateEnd=function(){

	}
	this.startRotate=function(callback){
		r=-Math.PI/2;
		rotateEnd=callback;
	}
	this.MyAPI={};
	this.MyAPI.render=function(){
		if(r==-1){
			return;
		}
		this.rotation.x+=r/SPEED;
		if(this.rotation.x<=r){
			r=-1;
			rotateEnd();
		}
	}

}