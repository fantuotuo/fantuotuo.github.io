const N=200;
// const W=800;
// const H=600;
const W=window.innerWidth;
const H=window.innerHeight;
const SINGLE_AREA=W*H/N;
const AREA_LENGTH=Math.floor(Math.sqrt(SINGLE_AREA));
const SPEED=50;
const T=100;

export default function Par(i){
	let geo=new THREE.SphereGeometry(5,32,32);
	let r=20+Math.floor(185*Math.random()),
		g=20+Math.floor(185*Math.random()),
		b=20+Math.floor(185*Math.random());
	let color=256*256*r+256*g+b;

	let mat=new THREE.MeshLambertMaterial({color:color});
	mat.transparent=true;
	this.__proto__=new THREE.Mesh(geo,mat);

	this.x=(i*AREA_LENGTH)%W;
	this.y=Math.floor((i*AREA_LENGTH)/W) * AREA_LENGTH;

	this.o_x=this.dx=this.x;
	this.o_y=this.dy=this.y;

	this.r=3;
	this.alpha=1;

	this.MyAPI={};

	let t=Math.random()*T;
	this.MyAPI.render=function(){
		this.position.x=this.x;
		this.position.z=this.y;

		this.x+=(this.dx-this.x)/SPEED;
		this.y+=(this.dy-this.y)/SPEED;
		mat.opacity=this.alpha;

		let scale=0.8+0.2*Math.cos(t*2*Math.PI/T);
		this.scale.x=this.scale.y=this.scale.z=scale;
		t+=1;

	}






}