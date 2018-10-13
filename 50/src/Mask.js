import Btn from 'Btn.js';
import BtnTxt from 'BtnTxt.js';
import GLB from 'GLB.js';

export default function Mask(){
	this.__proto__=new THREE.Group();

	this.MyAPI={};
	var bg=new Btn("bg_mask.png",800,600,1024);
	bg.rotation.x=Math.PI*3/2;
	bg.position.set(0,10,0);
	this.add(bg);

	var btn_txt=new BtnTxt("你好");
	btn_txt.position.set(0,11,0);
	this.add(btn_txt);

	this.MyAPI.showTxt=function(txt){
		btn_txt.MyAPI.freshTxt.bind(btn_txt)(txt);
	}
}