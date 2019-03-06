import GameScene 		from '../out/GameScene.js';
import GameStartPanel 	from '../out/GameStartPanel.js';
import GLB 				from '../out/GLB.js';
import LoadUI 			from 'LoadUI.js';

const DELAY=200;

var game_scene=new GameScene();
GLB.game_scene=game_scene;
var manager=game_scene.manager;

var arr=[

];
var arr_sound=[
	"m.mp3",
];
// ball模型材质参数：漫反射0.4 高光0.1 硬度4
var arr_model=[

];
var arr_fbx=[
	// "ground.fbx",
	"baohe.fbx",
	"g1.fbx"
];

var total 			=arr.length;
var total_sound		=arr_sound.length;
var total_model		=arr_model.length;
var total_fbx		=arr_fbx.length;
var loadUI;

loadUI=new LoadUI();
THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );
function loadRes(){
	var count=-1;
	loadNext();

	function loadNext(){
		count++;
		loadUI.setProgress.bind(loadUI)(count,total+total_sound+total_model+total_fbx);
		if(count>=total){
			loadEnd();
		}else{
			new THREE.TextureLoader(manager).load("./assets/"+arr[count],function (res){
				GLB.res[arr[count]]=res;
				loadNext();
			});
		}
	}
	function loadEnd(){
		loadSound();
	}
}
function loadSound(){
	var count=-1;
	loadNext();
	function loadNext(){
		count++;
		loadUI.setProgress.bind(loadUI)(total+count,total+total_sound+total_model+total_fbx);
		if(count>=total_sound){
			loadEnd();
		}else{
			new THREE.AudioLoader().load("./assets/"+arr_sound[count],function(buffer){
				GLB.res[arr_sound[count]]=buffer;
				loadNext();
			})
		}
	}
	function loadEnd(){
		loadModel();
	}
}
function loadModel(){
	var count=-1;
	loadNext();
	function loadNext(){
		count++;
		loadUI.setProgress.bind(loadUI)(total+total_sound+count,total+total_sound+total_model+total_fbx);
		if(count>=total_model){
			loadEnd();
		}else{
			var l=new THREE.MTLLoader();
			// l.setBaseUrl("./assets/model/");
			l.setPath("./assets/model/")
			.load(arr_model[count]+".mtl",function(materials){
				materials.preload();

				var loader=new THREE.OBJLoader();
				loader.setPath("./assets/model/")
				.setMaterials(materials)
				.load(arr_model[count]+".obj",function(obj){
					GLB.res[arr_model[count]]=obj;
					loadNext();
				});
			});
		}
	}
	function loadEnd(){
		loadFbx();
	}
}
function loadFbx(){
	var count=-1;
	loadNext();
	function loadNext(){
		count++;
		loadUI.setProgress.bind(loadUI)(total+total_sound+total_model+count,total+total_sound+total_model+total_fbx);
		if(count>=total_fbx){
			loadEnd();
		}else{
			var l=new THREE.FBXLoader();
			l.load("./assets/model/"+arr_fbx[count],function(object){
				GLB.res[arr_fbx[count]]=object;

				loadNext();
			});
		}
	}
	function loadEnd(){console.log(33333333)
		setTimeout(init,DELAY);
	}
}




// new THREE.TextureLoader(manager).load("./assets/loading_logo.png",function(res){
// 	GLB.res["loading_logo.png"]=res;
// 	loadUI=new LoadUI();
// 	game_scene.addToScene(loadUI);
	
// 	$(".loading").addClass("hide");
// 	loadRes();
// });

loadRes();







var game_start_panel;
function init(){
	// ios上解决无法播放的问题
	var s=new THREE.Audio(game_scene.listener);
	s.setBuffer(GLB.res["m.mp3"]);
	function ios_sound_start(){
		s.play();
		s.stop();
		$(document)[0].removeEventListener("touchstart",start);
		$(document)[0].removeEventListener("mousedown",start);
	}
	$(document)[0].addEventListener("touchstart",start);
	$(document)[0].addEventListener("mousedown",start);

	$(".loading").addClass("hide");
	
	function start(){
		ios_sound_start();

		game_start_panel	=new GameStartPanel(game_scene);
		game_scene.addToScene(game_start_panel);
		game_start_panel.MyAPI.init.bind(game_start_panel)();
		game_scene.addTouch();

		$(".mask").addClass("hide");
	}
	// GLB.changeScene({type:"game_start"})
}

GLB.changeScene=function(obj){
	if(GLB.handler_timeout){
		clearTimeout(GLB.handler_timeout);
	}
	game_scene.removeFromScene(game_start_panel);
	game_scene.removeFromScene(game_play_panel);
	game_scene.removeFromScene(game_end_panel);
	game_scene.removeFromScene(game_help_panel);
	game_scene.changeColor(0);
	game_scene.subCameraEnable(false);
	if(obj.type=="game_start"){
		game_scene.subCameraEnable(true);	// 开启多相机模式
		game_scene.addToScene(game_play_panel);
		game_play_panel.MyAPI.init.bind(game_play_panel)();
	}else if(obj.type=="game_over"){
		game_end_panel.MyAPI.init.bind(game_end_panel)(obj.data);
		game_scene.addToScene(game_end_panel);
	}else if(obj.type=="game_init"){
		game_start_panel.MyAPI.init.bind(game_start_panel)();
		game_scene.addToScene(game_start_panel);
	}else if(obj.type=="game_help"){
		game_scene.changeColor(1);
		game_help_panel.MyAPI.init.bind(game_help_panel)();
		game_scene.addToScene(game_help_panel);
	}else if(obj.type=="game_back"){
		game_start_panel.MyAPI.init.bind(game_start_panel)();
		game_scene.addToScene(game_start_panel);
	}
}