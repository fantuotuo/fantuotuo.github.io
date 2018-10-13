import GLB from 'GLB.js';
const W=window.innerWidth;
const H=window.innerHeight;
export default function Box0(){
	this.__proto__=new THREE.Group();

	let geo=new THREE.BoxGeometry(100,100,100);
	let mat=new THREE.MeshLambertMaterial({color:0xff0000});
	// let o=new THREE.Mesh(geo,mat);
	// this.add(o)

	let o=GLB.res["box"];
	this.add(o);
	o.x=W/2;
	o.z=H/2;



	this.MyAPI={};
	this.MyAPI.render=function(){
		
	}


}