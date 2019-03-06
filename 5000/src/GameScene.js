import GLB from 'GLB.js';

const W=GLB.W;
const H=GLB.H;
const RANGE=30;
const BILI=W/H;
const SUPPORT_AUDIO=(window.AudioContext || window.webkitAudioContext)?true:false;
const K_SUB_CAM = 0.8;

const CAMERA_OFF_SET={
	x:-1,
	y:-1,
	z:0.9,
}
const FLIP_CODE={
	37:3,
	38:0,
	39:1,
	40:2,
}

export default function SceneInit(){
	var camera_d=Math.pow(2,0.5),
		camera_r=0;


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
		// console.log(loaded+"|"+total)
		// console.log("loading..."+Math.floor(100*loaded/total)+"%");
	}
	this.manager=manager;

			var container=$("#game-player")[0];
			var canvas;
			var scene,
				renderer;
			var camera_main;			// 主相机

			var camera_sub1,
				camera_sub2;			// 分相机
			var camera_sub_enabled=false;	// 分相机是否开启

				generateRenderer.bind(this)();
				generateScene.bind(this)();


				var listener=null;
				if(SUPPORT_AUDIO){
					listener=new THREE.AudioListener();
					// camera.add(listener);
				}
				this.listener=listener;

				var ambientLight,
					directionalLight;
				generateLights.bind(this)();
				generateCamera.bind(this)();
				generateHelper.bind(this)();
				generateRender.bind(this)();
				generateAPI.bind(this)();

				this.startRender();

	function generateScene(){
		scene = new THREE.Scene();
	}
	function generateCamera(){
		camera_main = new THREE.OrthographicCamera( RANGE * BILI / - 2, RANGE * BILI / 2, RANGE / 2, RANGE / - 2, -20, 20 );
		// camera_main.position.set(CAMERA_OFF_SET.x,CAMERA_OFF_SET.y,CAMERA_OFF_SET.z);
		camera_main.position.set(camera_d*Math.cos(camera_r),camera_d*Math.sin(camera_r),CAMERA_OFF_SET.z);
		
		camera_main.up=new THREE.Vector3(0,0,1);
		camera_main.updateProjectionMatrix();
		camera_main.lookAt(scene.position);

		// 此相机可以运动
		camera_sub1=new THREE.PerspectiveCamera(45,BILI*K_SUB_CAM,0.1,100);
		// camera_sub1 = new THREE.OrthographicCamera( RANGE * BILI / - 2, RANGE * BILI / 2, RANGE / 2, RANGE / - 2, -200, 200 );
		camera_sub1.up=new THREE.Vector3(0,1,0);
		camera_sub1.updateProjectionMatrix();
		camera_sub1.position.set(0,0,1.3);
		camera_sub1.lookAt(0,0,0.15);
		var cameraPerspectiveHelper = new THREE.CameraHelper( camera_sub1 );
		// scene.add( cameraPerspectiveHelper );
		
		// 此相机固定水平视角
		camera_sub2=new THREE.PerspectiveCamera(45,BILI*K_SUB_CAM,0.1,100);
		// camera_sub2 = new THREE.OrthographicCamera( RANGE * BILI / - 2, RANGE * BILI / 2, RANGE / 2, RANGE / - 2, -200, 200 );
		camera_sub2.up=new THREE.Vector3(0,1,0);
		camera_sub2.updateProjectionMatrix();
		camera_sub2.position.set(0,0,1.3);
		camera_sub2.lookAt(0,0,0.15);
	}
	function generateRenderer(){
		if(!!window.ActiveXObject || "ActiveXObject" in window){
			createRenderIE();
		}else{
			createRenderOther();
		}
		renderer.autoClear=false;
		function createRenderIE(){
			renderer=new THREE.WebGLRenderer({ antialias: true });
			renderer.setSize(W,H);
			renderer.shadowMap.enabled=true;
			renderer.setPixelRatio( window.devicePixelRatio );
			container.appendChild(renderer.domElement);
		}
		function createRenderOther(){
			canvas = document.createElement( 'canvas' );
			container.appendChild( canvas );
			renderer = new THREE.WebGLRenderer(canvas.getContext('webgl'));
			renderer.setSize( W, H );
			renderer.shadowMap.enabled=true;
		}
	}

	var camera_sub1_target={},
		camera_sub1_dir={},
		camera_sub1_target_up={},
		camera_sub1_dir_up={},
		pos_ready={};
	function generateRender(){
		this.startRender=function(){
			this.endRender();
			render.bind(this)();
		}
		let c=0;
		function render(timestamp){
			c++;
			for(var i=0;i<scene.children.length;i++){
				if(scene.children[i].MyAPI && scene.children[i].MyAPI.render){
					scene.children[i].MyAPI.render.bind(scene.children[i])(timestamp);
				}
			}
			renderer.clear();

			renderer.setViewport(0,0,W,H);
			renderer.render( scene, camera_main );

			if(camera_sub_enabled){
				if(camera_sub1_target.x!=undefined){
					let x=camera_sub1.position.x+camera_sub1_dir.x,
						y=camera_sub1.position.y+camera_sub1_dir.y,
						z=camera_sub1.position.z+camera_sub1_dir.z;

					camera_sub1.up=new THREE.Vector3(0,0,1);
					camera_sub1.updateProjectionMatrix();
					camera_sub1.position.set(x,y,z);
					camera_sub1.lookAt(0,0,0.15);

					if((camera_sub1_target.x-x)*(camera_sub1_dir.x)<=0){
						camera_sub1.up=new THREE.Vector3(0,0,1);
						camera_sub1.updateProjectionMatrix();
						camera_sub1.position.set(camera_sub1_target.x,camera_sub1_target.y,camera_sub1_target.z);
						camera_sub1.lookAt(0,0,0.15);

						camera_sub1_target={};
						camera_sub1_dir={};
					}
				}
				if(camera_sub1_target_up.x!=undefined){
					let x=camera_sub1.up.x+camera_sub1_dir_up.x,
						y=camera_sub1.up.y+camera_sub1_dir_up.y,
						z=camera_sub1.up.z+camera_sub1_dir_up.z;

					camera_sub1.up=new THREE.Vector3(x,y,z);
					camera_sub1.updateProjectionMatrix();
					camera_sub1.lookAt(0,0,0.15);

					if((camera_sub1_target_up.x-x)*(camera_sub1_dir_up.x)<=0){
						camera_sub1.up=new THREE.Vector3(camera_sub1_target_up.x,camera_sub1_target_up.y,camera_sub1_target_up.z);
						camera_sub1.updateProjectionMatrix();
						camera_sub1.lookAt(0,0,0.15);

						camera_sub1_target_up={};
						camera_sub1_dir_up={};
						getDir();
					}
				}
				renderer.setViewport(W*1/16,H*2/16,W*3/8,H*3/8*(1/K_SUB_CAM));
				renderer.render(scene,camera_sub1);
				// camera_sub1.position.z+=0.01
				// camera_sub1.position.y=0.6*Math.sin(c/300);
				// camera_sub1.position.z=0.6*Math.cos(c/300);
				// camera_sub1.lookAt(scene.position);
				camera_sub1.updateMatrixWorld();

				renderer.setViewport(W*9/16,H*2/16,W*3/8,H*3/8*(1/K_SUB_CAM));
				renderer.render(scene,camera_sub2);
				camera_sub2.updateMatrixWorld();
			}

			this.req_id=requestAnimationFrame( render.bind(this) );
		}

		this.endRender=function(){
			if(this.req_id!=undefined){
				cancelAnimationFrame(this.req_id);
			}
		}
	}
	function generateLights(){
		ambientLight = new THREE.AmbientLight( 0xffffff,0.1 );
		scene.add( ambientLight );
		directionalLight = new THREE.DirectionalLight( 0xffff00,1.5);
		directionalLight.position.set(0,0,10);
		scene.add( directionalLight );
		directionalLight.castShadow=true;
		directionalLight.shadow.camera.near = 0;
		directionalLight.shadow.camera.far =18;
		directionalLight.shadow.camera.left = -6;
		directionalLight.shadow.camera.right = 6;
		directionalLight.shadow.camera.top = 6;
		directionalLight.shadow.camera.bottom = -6;
		this.changeColor=function(type){
			let color=new THREE.Color(1,1,1);
			if(type==1){
				// help界面平行光颜色
				color=new THREE.Color(1,0.7,1);
			}
			// directionalLight.color=color;
		}
		directionalLight.shadow.mapSize.x=1024;
		directionalLight.shadow.mapSize.y=1024;
	}
	function generateHelper(){
		var gridHelper = new THREE.GridHelper( 20, 20 );
		// scene.add( gridHelper );
		var helper = new THREE.CameraHelper(directionalLight.shadow.camera );
		// scene.add(helper);
	}
	function generateAPI(){
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

		var ua = navigator.userAgent;
	    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	    isMobile = isIphone || isAndroid;
	    var mi = ua.match(/XiaoMi/i);   // 小米（手机或平板）
    
				this.addClickEvent=function (objects,str_name,fn,cancelEventAfter,cancelEventPre,camera){
					camera=camera==undefined?camera_main:camera_sub1;
					let obj=[];
					objects.forEach(child=>{
						if(!(child instanceof THREE.Sprite)){
							obj.push(child);
						}
					});
					(cancelEventPre===undefined || cancelEventPre===true) && removeEvent.bind(this)();
					// $("#game-player")[0].addEventListener("touchstart",touch);
					// $("#game-player")[0].addEventListener("click",click);
					if(isMobile || ipad || mi){
						$("#game-player").bind("touchstart",touch);
					}else{
						$("#game-player").bind("click",click);
					}

					function removeEvent(){
						// $("#game-player")[0].removeEventListener("touchstart",touch);
						// $("#game-player")[0].removeEventListener("click",click);
						$("#game-player").unbind("click");
						$("#game-player").unbind("touchstart");
					}
					function click(ev){
						let e=ev.originalEvent;
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
					        	if(cancelEventAfter===true){
					        		removeEvent.bind(this)();
					        	}
					        	fn(intersected);
					        }
					    }
					}
					function touch(ev){
						let e=ev.originalEvent;
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
					        	if(cancelEventAfter===true){
					        		removeEvent.bind(this)();
					        	}
					        	fn(intersected);
					        }
					    }
					}
				}

		/**
		 * 开启/关闭多相机模式（主相机切换到背景的位置）
		 * @param  {[type]} bool [开启/关闭]
		 */
		this.subCameraEnable=function(bool){
			if(bool){
				camera_main.position.set(0,-1998,0);
				camera_main.near=-1000;
				camera_main.far=10;
				camera_main.updateProjectionMatrix();
			}else{
				camera_main.position.set(CAMERA_OFF_SET.x,CAMERA_OFF_SET.y,CAMERA_OFF_SET.z);
				camera_main.near=-20;
				camera_main.far=20;
				camera_main.updateProjectionMatrix();
			}
		}
		/**
		 * 打开/关闭子相机（子相机的景物显示）
		 * @param  {[type]} bool [打开/关闭]
		 */
		this.enableCameraSub=function(bool){
			camera_sub_enabled=bool;
		}
		// 1号相机视角初始化（不带动画）
		this.changeViewSub1Now=function(){
			camera_sub1_target={},
			camera_sub1_dir={},
			camera_sub1_target_up={},
			camera_sub1_dir_up={},
		
			camera_sub1.up=new THREE.Vector3(0,1,0);
			camera_sub1.updateProjectionMatrix();
			camera_sub1.position.set(0,0,2.6);
			camera_sub1.lookAt(0,0,0.15);
		}
		// 相机动画开始
		this.changeViewSub1=function(pos){
			if(camera_sub1_target.x!=undefined || camera_sub1_target_up.x!=undefined) return;		// 相机正在动画，不响应相机动画
			pos_ready=pos;
			if(pos.z!=camera_sub1.position.z){
				getUp();
			}else{
				getDir();
			}
			// setTimeout(getDir,1000);
			function getUp(){
				let x=-pos.x-camera_sub1.up.x,
					y=-pos.y-camera_sub1.up.y,
					z=0-camera_sub1.up.z;
				let l=Math.pow(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2),0.5);
				if(l!=0){
					// 相机动画速度
					let speed=0.01;
					x*=speed/l;
					y*=speed/l;
					z*=speed/l;
					camera_sub1_target_up={x:-pos.x,y:-pos.y,z:0};
					camera_sub1_dir_up={x,y,z};
				}
			}
		}
		// 重置2号分相机的视角
		this.changeViewSub2=function(pos){
			camera_sub2.up=new THREE.Vector3(0,0,1);
			camera_sub2.updateProjectionMatrix();
			camera_sub2.position.set(pos.x,pos.y,pos.z);
			camera_sub2.lookAt(0,0,0.15);
		}


	}


	function findUp(tar,cam){
		let z,
			up;
		if(cam.z<=tar.z){
			z=1;
			up={x:0,y:0,z};
			return up;
		}else{
			z=(Math.pow(cam.x-tar.x,2)+Math.pow(cam.y-tar.y,2))/(cam.z-tar.z)+cam.z;
		}
		up={x:tar.x-cam.x,y:tar.y-cam.y,z:z-cam.z};

		return up;
	}
	function getDir(pos){
		pos=pos_ready;

		var p={x:pos.x,y:pos.y,z:pos.z};
		// p.z=camera_sub1.position.z;
		let x=p.x-camera_sub1.position.x,
			y=p.y-camera_sub1.position.y,
			z=p.z-camera_sub1.position.z;
		let l=Math.pow(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2),0.5);
		if(l!=0){
			// 相机动画速度
			let speed=0.01;
			x*=speed/l;
			y*=speed/l;
			z*=speed/l;
			camera_sub1_target={x:p.x,y:p.y,z:p.z};
			camera_sub1_dir={x,y,z};
		}
	}
	this.addTouch=function(){
		unbind();

		var ua = navigator.userAgent;
	    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
	    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
	    isMobile = isIphone || isAndroid;
	    var mi = ua.match(/XiaoMi/i);   // 小米（手机或平板）

	    bind();

		var o_x=0,
			o_y=0,
			scale=0.01;

		function touchStart(e){
			unbind();
			$(document).bind("touchmove",touchMove);
			$(document).bind("touchend",touchEnd);

			let ev=e.originalEvent;
			o_x=ev.targetTouches[0].clientX;
			o_y=ev.targetTouches[0].clientY;
		}
		function touchMove(e){
			let ev=e.originalEvent;
			let x=ev.targetTouches[0].clientX,
				y=ev.targetTouches[0].clientY;
			let dx=x-o_x;
			camera_r-=dx*scale;
			o_x=x;
			o_y=y;

			update();
		}
		function touchEnd(e){
			o_x=0;
			o_y=0;
			unbind();
			bind();
		}
		function mouseDown(e){
			unbind();
			$(document).bind("mousemove",mouseMove);
			$(document).bind("mouseup",mouseUp);

			o_x=e.pageX;
			o_y=e.pageY;
		}
		function mouseMove(e){
			let x=e.pageX,
				y=e.pageY;
			let dx=x-o_x;
			camera_r-=dx*scale;
			o_x=e.pageX;
			o_y=e.pageY;

			update();
		}
		function mouseUp(e){
			o_x=0;
			o_y=0;
			unbind();
			bind();
		}



		function update(){
			camera_main.position.set(camera_d*Math.cos(camera_r),camera_d*Math.sin(camera_r),CAMERA_OFF_SET.z);
		
			camera_main.up=new THREE.Vector3(0,0,1);
			camera_main.updateProjectionMatrix();
			camera_main.lookAt(scene.position);
		}
		function bind(){
			if(isMobile || ipad || mi){
				$(document).bind("touchstart",touchStart);
			}else{
				$(document).bind("mousedown",mouseDown);
			}
		}
		function unbind(){
			$(document).unbind("mousedown");
			$(document).unbind("mousemove");
			$(document).unbind("mouseup");
			$(document).unbind("touchstart");
			$(document).unbind("touchmove");
			$(document).unbind("touchend");
		}

	}


}