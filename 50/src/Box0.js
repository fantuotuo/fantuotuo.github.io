export default function Box0(){
	this.__proto__=new THREE.Group();

	let geo=new THREE.BoxGeometry(100,100,100);
	let mat=new THREE.MeshLambertMaterial({color:0xff0000});
	let o=new THREE.Mesh(geo,mat);
	this.add(o)





	this.MyAPI={};
	this.MyAPI.render=function(){
		o.rotation.x+=0.01
	}


}