import GLB from 'GLB.js';
const W=window.innerWidth;
const H=window.innerHeight;
const scale=0.6;
const DEPTH=80;
const OFFSET=100*scale;
export default function Box0(){
	this.__proto__=new THREE.Group();

	let geo=new THREE.BoxGeometry(100,100,100);
	let mat=new THREE.MeshLambertMaterial({color:0xff0000});
	// let o=new THREE.Mesh(geo,mat);
	// this.add(o)

	let o=GLB.res["box5"];
	this.add(o);
	o.scale.x=
	o.scale.y=
	o.scale.z=scale;
	
	this.position.x=W/2;
	this.position.z=H/2 + DEPTH +OFFSET;
	this.rotation.x=-Math.PI/2;

	this.MyAPI={};
	this.MyAPI.render=function(){

	}


}