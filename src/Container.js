const W=window.innerWidth;
const H=window.innerHeight;

export default function Container(){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	this.MyAPI.render=function(){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].MyAPI && this.children[i].MyAPI.render){
				this.children[i].MyAPI.render.bind(this.children[i])();
			}
		}
	}

	this.position.x=-W/2;
	this.position.z=-H/2;


}