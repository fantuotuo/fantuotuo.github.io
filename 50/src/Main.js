import GameScene 		from '../out/GameScene.js';
import BtnTxt 			from 'BtnTxt.js'
import GamePlayPanel 	from '../out/GamePlayPanel.js';
import GameStartPanel 	from '../out/GameStartPanel.js';
import GameEndPanel 	from '../out/GameEndPanel.js';
import GameHelpPanel 	from 'GameHelpPanel.js';
import GLB 				from '../out/GLB.js';
import LoadUI 			from 'LoadUI.js';

const DELAY=200;

var game_scene=new GameScene();
GLB.game_scene=game_scene;
var manager=game_scene.manager;

var arr=[
	"bg_mask.png",
	"bg_start.png",
	"bg_end.png",
	"bg_play.png",
	"box.png",
	"btn_start.png",
	"btn_submit.png",
	"btn_help.png",
	"floor.png",
	"floor0.png",
	"floor2.png",
	"floor4.png",
	"floor6.png",
	"bg_help.png",
	"tip0.png",
	"tip1.png",
	"tip10.png",
	"tip20.png",
	"button1.png",
	"pics4-1.png",
];
var arr_sound=[
	"down.mp3",
	"jump.mp3",
	"pass.mp3",
	"fragile.mp3",
	"open.mp3",
];
var arr_model=[
	"floor1",
	"floor3",
	"floor7",
	"case",
	"block",
	"pool",
	"case1",
	"obj1",
	"obj2",
];

var total 		=arr.length;
var total_sound	=arr_sound.length;
var total_model	=arr_model.length;
var loadUI;

function loadRes(){
	var count=-1;
	loadNext();

	function loadNext(){
		count++;
		loadUI.setProgress.bind(loadUI)(count,total+total_sound+total_model);
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
		loadUI.setProgress.bind(loadUI)(total+count,total+total_sound+total_model);
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
		loadUI.setProgress.bind(loadUI)(total+total_sound+count,total+total_sound+total_model);
		if(count>=total_model){
			loadEnd();
		}else{
			var l=new THREE.MTLLoader();
			l.setBaseUrl("./assets/model/");
			l.setPath("./assets/model/");
			l.load(arr_model[count]+".mtl",function(materials){
				var loader=new THREE.OBJLoader();
				loader.setPath("./assets/model/");
				loader.setMaterials(materials);
				loader.load(arr_model[count]+".obj",function(obj){
					GLB.res[arr_model[count]]=obj;
					loadNext();
				});
			});
		}
	}
	function loadEnd(){
		setTimeout(init,DELAY);
	}
}
new THREE.TextureLoader(manager).load("./assets/loading_logo.png",function(res){
	GLB.res["loading_logo.png"]=res;
	loadUI=new LoadUI();
	game_scene.addToScene(loadUI);
	loadRes();
});







var game_play_panel;
var game_start_panel;
var game_end_panel;
var game_help_panel;
function init(){
	// ios上解决无法播放的问题
	var s=new THREE.Audio(game_scene.listener);
	s.setBuffer(GLB.res["open.mp3"]);
	function ios_sound_start(){
		s.play();
		s.stop();
		document.removeEventListener("touchstart",ios_sound_start);
	}
	document.addEventListener("touchstart",ios_sound_start);

	game_scene.removeFromScene(loadUI);
	game_play_panel		=new GamePlayPanel(game_scene);
	game_start_panel	=new GameStartPanel(game_scene);
	game_end_panel		=new GameEndPanel(game_scene);
	game_help_panel		=new GameHelpPanel(game_scene);

	game_scene.addToScene(game_start_panel);
	game_start_panel.MyAPI.init.bind(game_start_panel)();
}

GLB.changeScene=function(obj){
	if(GLB.handler_timeout){
		clearTimeout(GLB.handler_timeout);
	}
	game_scene.removeFromScene(game_start_panel);
	game_scene.removeFromScene(game_play_panel);
	game_scene.removeFromScene(game_end_panel);
	game_scene.removeFromScene(game_help_panel);
	
	if(obj.type=="game_start"){
		game_play_panel.MyAPI.init.bind(game_play_panel)();
		game_scene.addToScene(game_play_panel);
	}else if(obj.type=="game_over"){
		game_end_panel.MyAPI.init.bind(game_end_panel)(obj.data);
		game_scene.addToScene(game_end_panel);
	}else if(obj.type=="game_init"){
		game_start_panel.MyAPI.init.bind(game_start_panel)();
		game_scene.addToScene(game_start_panel);
	}else if(obj.type=="game_help"){
		game_help_panel.MyAPI.init.bind(game_help_panel)();
		game_scene.addToScene(game_help_panel);
	}
}