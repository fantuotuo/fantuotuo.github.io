import GLB from 'GLB.js';
const CAMERA_WIDTH=GLB.CAMERA_WIDTH;
const W=GLB.W;
const H=GLB.H;
const W_B=150*CAMERA_WIDTH/W;
const H_B=130*CAMERA_WIDTH/W;
const INTER_X=0.2;
const INTER_Z=0.5;



export default function Block(index){
	this.__proto__=new THREE.Group();
	var pos=index>=4?index+1:index;

	// var geo=new THREE.CubeGeometry(W_B,0.2,H_B);
	// var mat=new THREE.MeshLambertMaterial({color:0x000099});
	// var mesh=new THREE.Mesh(geo,mat);
	var mesh=GLB.res["block"].clone();
	this.add(mesh);

	var geo=new THREE.PlaneGeometry(W_B-0.05,H_B-0.05,1,1);
	var mat=new THREE.MeshLambertMaterial();
	var plane=new THREE.Mesh(geo,mat);
	plane.position.y=0.11;
	plane.rotation.x=-Math.PI/2;
	this.add(plane);
	getTexture("pics4-1.png",index+0,geo,mat);

	var base_x=-(CAMERA_WIDTH - W_B)/2 + INTER_X,
		base_z=-(CAMERA_WIDTH*H/W -H_B)/2 +INTER_Z;
	this.position.x=base_x + (pos%3)*(-base_x);
	this.position.z=base_z + Math.floor(pos/3)*(-base_z);

	var tar=null;
	var ori=null;
	var t=-1;
	var tt=30;
	this.MyAPI={};
	this.MyAPI.render=function(){
		t++;
		if(tar){
			let x=line(ori.x,tar.x,t,tt),
				z=line(ori.z,tar.z,t,tt);
			this.position.x=x;
			this.position.z=z;
		}
	}
	this.MyAPI.move=function(i){
		tar={x:-W_B+(i%3)*W_B,z:-H_B/2 + Math.floor(i/3)*H_B};
		ori={x:this.position.x,z:this.position.z};
		t=0;
	}
	this.MyAPI.getCube=function(){
		return mesh.children[0];
	}

	function line(x0,xt,t,tt){
		if(t<=0){
			return x0;
		}else if(t>=tt){
			return xt;
		}else{
			return x0+(xt-x0)*(t/tt);
		}
	}

	function getTexture(str,i,geo,mat){
		if(i>=6){
			return;
		}
		mat.map=GLB.res[str];

		var x0=0.333*(i%3),
		x1=x0+0.333,
		y0=0.5-Math.floor(i/3)*0.5,
		y1=y0+0.5;

		geo.faceVertexUvs[0]=[];
		var bricks = [
			new THREE.Vector2(x0, y1),
			new THREE.Vector2(x0, y0),
			new THREE.Vector2(x1, y0),
			new THREE.Vector2(x1, y1),
		];
		geo.faceVertexUvs[0][0] = [ bricks[0], bricks[1], bricks[3] ];
		geo.faceVertexUvs[0][1] = [ bricks[1], bricks[2], bricks[3] ];
	}
}