const SUPPORT_AUDIO=(window.AudioContext || window.webkitAudioContext)?true:false;
import GLB from "GLB.js";

export default function Sound(listener,url){
	if(SUPPORT_AUDIO){
		this.__proto__=new THREE.Audio(listener);
		if(GLB.res[url]){
			this.setBuffer(GLB.res[url]);
		}
	}else{
		// 兼容IE
		var embed;
		this.play=function(){
			embed = document.createElement("audio");
			$(embed).attr("style","display:none");
			$(embed).attr("autoplay","autoplay");
			$(embed).attr("src","assets/"+url);
			$("#game-player").append(embed);

			this.isPlaying=true;
		}
		this.stop=function(all){
			if(all){
				$("#game-player audio").remove();
			}else{
				$(embed).remove();
			}
		}


	}

	this.url=url;
	this.isPlaying=false;




}