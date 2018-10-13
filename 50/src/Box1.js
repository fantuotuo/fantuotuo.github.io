import GLB from 'GLB.js';
const W=window.innerWidth;
const H=window.innerHeight;
export default function Box1(){
	this.__proto__=new THREE.Group();

	let o=GLB.res["box2"];
	this.add(o);
	o.x=W/2;
	o.z=H/2;

	this.MyAPI={};
	this.MyAPI.render=function(){

	}

}