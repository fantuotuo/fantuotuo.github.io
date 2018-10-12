import GLB from 'GLB.js';

// const W=800;
// const H=600;
const W=window.innerWidth;
const H=window.innerHeight;
const RANGE=15;
const BILI=W/H;

const CAMERA_OFF_SET={
	x:0,
	y:800,
	z:0,
}

const FLIP_CODE={
	37:3,
	38:0,
	39:1,
	40:2,
}

export default function SceneInit2(){
	this.req_id=undefined;
	var width_container=$("#game-player").width();
	var height_container=$("#game-player").height();

	function resize(){
		width_container=$("#game-player").width();
		height_container=$("#game-player").height();
	}
	window.addEventListener("resize",resize)

	var manager=new THREE.LoadingManager();
	manager.onProgress=function(i,loaded,total){

	}
	this.manager=manager;

			var container=$("#game-player")[0];
			var canvas;
			var camera, scene, renderer;

				canvas = document.createElement( 'canvas' );
				container.appendChild( canvas );
				scene = new THREE.Scene();

				camera = new THREE.OrthographicCamera( RANGE * BILI / - 2, RANGE * BILI / 2, RANGE / 2, RANGE / - 2, -20, 20 );
				camera = new THREE.PerspectiveCamera(45,W/H,1,10000);
				camera.position.set(CAMERA_OFF_SET.x,CAMERA_OFF_SET.y,CAMERA_OFF_SET.z);
				camera.lookAt(scene.position);
				camera.rotation.z+=Math.PI*3/2;

			var listener=new THREE.AudioListener();
			this.listener=listener;
			camera.add(listener);

				var ambientLight = new THREE.AmbientLight( 0xffffff,0.2 );
				scene.add( ambientLight );
				var directionalLight = new THREE.DirectionalLight( 0xffffff,1.0);
				directionalLight.position.set(10,10,2);
				scene.add( directionalLight );
				directionalLight.castShadow=true;
				directionalLight.shadow.camera.near = 2;
				directionalLight.shadow.camera.far = 20;
				directionalLight.shadow.camera.left = -5;
				directionalLight.shadow.camera.right = 5;
				directionalLight.shadow.camera.top = 5;
				directionalLight.shadow.camera.bottom = -5;

				renderer = new THREE.WebGLRenderer(canvas.getContext('webgl'));
				renderer.setSize( W, H );
				renderer.shadowMap.enabled=true;

				var gridHelper = new THREE.GridHelper( 2, 2 );
				scene.add( gridHelper );
				var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
				// scene.add(helper);


				this.startRender=function(){
					this.endRender();

					render.bind(this)();
				}
				function mod(x,y){
					if(x>=0){
						return x%y;
					}else{
						x=x+Math.ceil(Math.abs(x)/y)*y;
						return x%y;
					}
				}
				let ang=0.1;
				let o_x=0;
				let ratio=0.01;
				let rot=Math.PI*1/2;
				canvas.addEventListener("touchstart",function(e){
					o_x=e.targetTouches[0].clientX;
				})
				canvas.addEventListener("touchmove",function(e){
					let x=e.targetTouches[0].clientX;
					ang+=ratio*(x-o_x);
					if(mod(ang,Math.PI*2)<=Math.PI){
						rot=Math.PI*1/2;
					}else{
						rot=Math.PI*3/2;
					}
					o_x=x;
				})
				function render(){
					camera.position.y=800*Math.cos(ang);
					camera.position.x=-800*Math.sin(ang);
					camera.lookAt(scene.position);
					camera.rotation.z+=rot;

					for(var i=0;i<scene.children.length;i++){
						if(scene.children[i].MyAPI && scene.children[i].MyAPI.render){
							scene.children[i].MyAPI.render.bind(scene.children[i])();
						}
					}

					renderer.render( scene, camera );
					this.req_id=requestAnimationFrame( render.bind(this) );
				}

				this.endRender=function(){
					if(this.req_id!=undefined){
						cancelAnimationFrame(this.req_id);
					}
				}

				this.addToScene=function(obj){
					scene.add(obj);
				}
				this.removeFromScene=function(obj){
					scene.remove(obj);
				}
				this.lookAt=function(pos){
					var c_x=pos.x+CAMERA_OFF_SET.x,
						c_y=pos.y+CAMERA_OFF_SET.y,
						c_z=pos.z+CAMERA_OFF_SET.z;
					camera.position.set(c_x,c_y,c_z);
					camera.lookAt(pos);
				}


				this.addClickEvent=function (objects,str_name,fn){
					let obj=[];
					objects.forEach(child=>{
						if(!(child instanceof THREE.Sprite)){
							obj.push(child)
						}
					})
					removeEvent.bind(this)();
					$("#game-player")[0].addEventListener("touchstart",touch);
					$("#game-player")[0].addEventListener("click",click);

					function removeEvent(){
						$("#game-player")[0].removeEventListener("touchstart",touch);
						$("#game-player")[0].removeEventListener("click",click);
					}
					function click(e){
						var mouse={};
						mouse.x=(e.offsetX/width_container)*2-1;
						mouse.y=-(e.offsetY/height_container)*2+1;

					    var raycaster = new THREE.Raycaster();
					    raycaster.setFromCamera(mouse,camera);
					    var intersects = raycaster.intersectObjects(obj);

					    if (intersects.length > 0) {
					        //选中第一个射线相交的物体
					        var SELECTED = intersects[0].object;
					        var intersected = intersects[0].object;
					        if(str_name=="" || intersected.name==str_name){
					        	if(fn(intersected)!==false){
					        		removeEvent.bind(this)();
					        	}
					        }
					    }
					}
					function touch(e){
						var off_x=e.targetTouches[0].clientX-$("#game-player")[0].offsetLeft;
						var off_y=e.targetTouches[0].clientY-$("#game-player")[0].offsetTop;


						var mouse={};
						mouse.x=(off_x/width_container)*2-1;
						mouse.y=-(off_y/height_container)*2+1;

					    var raycaster = new THREE.Raycaster();
					    raycaster.setFromCamera(mouse,camera);
					    var intersects = raycaster.intersectObjects(obj);

					    if (intersects.length > 0) {
					        //选中第一个射线相交的物体
					        var SELECTED = intersects[0].object;
					        var intersected = intersects[0].object;
					        if(str_name=="" || intersected.name==str_name){
					        	if(fn(intersected)!==false){
					        		removeEvent.bind(this)();
					        	}
					        }
					    }
					}
				}


				this.startRender();
}