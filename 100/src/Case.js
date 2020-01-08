import GLB from 'GLB.js';


export default function Case(){
	this.__proto__=new THREE.Group();

	let c,objs=[];
	let p={x:0,y:0,z:0};
	let ang=-1;

	this.MyAPI={};
	this.MyAPI.setPos=function(pos){
		p=pos;
		this.position.set(p.x,p.y,p.z);
	}
	this.MyAPI.set=function(mat,pos){
		c=GLB.res['case1'].clone();
		c.children[0].receiveShadow=true;
		c.children[0].castShadow=true;
		this.add(c);
		c.children[0].material.transparent=true;

		for(let i=0;i<mat.length;i++){
			for(let j=0;j<mat[i].length;j++){
				if(mat[i][j] == 1){
					let obj=GLB.res["obj2"].clone();
					obj.position.set(j,0.2,i);
					obj.children[0].castShadow=true;
					obj.children[0].receiveShadow=true;
					this.add(obj);
					objs.push(obj);
				}
			}
		}

	}
	this.MyAPI.render=function(){
		if(ang!=-1){
			if(this.rotation.z<ang){
				c.children[0].material.opacity=0.2;
				this.rotation.z+=0.03;
			}
		}
	}
	this.MyAPI.startRotate=function(){
		initPos.bind(this)();
		ang=Math.PI;
	}


	function initPos(){
		let off={x:0.1,y:-0.4,z:0.1};
		c.position.x+=off.x;
		c.position.y+=off.y;
		c.position.z+=off.z;
		for(let i=0;i<objs.length;i++){
			objs[i].position.x+=off.x;
			objs[i].position.y+=off.y;
			objs[i].position.z+=off.z;
		}
		this.position.x-=off.x;
		this.position.y-=off.y;
		this.position.z-=off.z;

	}



}