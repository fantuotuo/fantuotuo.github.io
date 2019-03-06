export default{
	changeScene:function(){
		
	},

	res:{

	},
	handler_timeout:undefined,
	W:900,
	H:1600,
	CAMERA_WIDTH:20,

	
	game_scene:undefined,
	shadowEnable:function(obj,type){
		let prop="castShadow";
		if(type==0){
			prop="receiveShadow";
		}
		obj[prop]=true;
		if(!obj.children) return;
		for(let i=0;i<obj.children.length;i++){
			obj.children[i][prop]=true;
			this.shadowEnable(obj.children[i],type);
		}
	},
	lowReflect:function(scene){
		for(var i=0;i<scene.children.length;i++){
			var mat=scene.children[i].material;
			mat.specular=new THREE.Color(0.2,0.2,0.2);
			mat.reflectivity=0.02;
			mat.shininess=2;
		}
	},

	BASE_SCALE:1,

}