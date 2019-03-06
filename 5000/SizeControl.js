function SizeControl(){
	var W=900,
		H=1600,
		BILI=W/H;

	var container = $("#game-player");
	var screen_width=1,			// 屏幕宽
		screen_height=1;		// 屏幕高

	var ua = navigator.userAgent;
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
    isMobile = isIphone || isAndroid;
    var isWX = ua.match(/MicroMessenger/i) != null;
    var mi = ua.match(/XiaoMi/i);   // 小米（手机或平板）



	function getScreenSize(){
		screen_width=$(window).width() || window.innerWidth;
		screen_height=$(window).height() || window.innerHeight;
		if(isMobile || ipad || mi){
			screen_width=window.innerWidth;
			screen_height=window.innerHeight;
		}
	}
	/**
	 * 用showAll模式刷新container尺寸
	 */
	function showAll(){
		getScreenSize();
		let w,h,l,t;
		if(screen_width/screen_height>=BILI){
			h=screen_height;
			w=screen_height*BILI;
			t=0;
			l=(screen_width - w)/2;
		}else{
			w=screen_width;
			h=screen_width/BILI;
			l=0;
			t=(screen_height - h)/2;
		}
		container.attr("style","position:absolute;width:"+w+"px;height:"+h+"px;top:"+t+"px;left:"+l+"px;");
	}
	this.showAllBegin=function(){
		showAll();
		window.onresize=showAll;
	}
}