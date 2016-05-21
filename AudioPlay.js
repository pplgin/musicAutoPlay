/**
 * Created by johnnyjiang on 16/5/21.
 */
(function($){
	"use strict";
	$.fn.audioPlay = function(_opt){
		var AudioEle = this.get(0),playIndex = 0;
		var _defautOpt ={
			songArr:[],
			callback:function(audio){} //添加曝露方法
		};
		if(!_opt.songArr) return;
		$.extend(_defautOpt,_opt);

		var AudioPlay = {
			init:function(){
				AudioPlay.changeMusic(0);
				//播放监听
				$(AudioEle).on('timeupdate', function() {
					var prec = this.currentTime / AudioEle.duration
					if(prec ===1){
						if(playIndex<_defautOpt.songArr.length-1){
							AudioPlay.changeMusic(playIndex+1);
						}else{
							if(_defautOpt.songArr.length===0){
								AudioEle.currentTime = 0;
								AudioEle.play();
							}else{
								AudioPlay.changeMusic(0);
							}
						}
					}
				});

				//曝露方法
				if(typeof _defautOpt.callback ==='function'){
					_defautOpt.callback.call(this,AudioPlay);
				}
			},
			changeMusic:function(i){
				AudioEle.src = _defautOpt.songArr[i];
				playIndex = i;
				if(typeof _defautOpt.nowIndex ==='function'){
					_defautOpt.nowIndex.call(this,playIndex);
				}
				AudioEle.load();
				AudioEle.play();
			},
			//音乐置顶
			playNow:function(_link){
				this.addSong(_link,0);
				this.changeMusic(0);
			},
			//添加
			addSong:function(_link,i){
				if(i>0){
					var Arr = [].concat(_defautOpt.songArr);
					var _newList  = Arr.splice(i-1,Arr.length-(i-1));
					Arr.push(_link);
					_defautOpt.songArr = Arr.concat(_newList);
				}
			},
			//删除
			removeSong:function(i){
				if(playIndex === i){
					playIndex--;
				}
				_defautOpt.songArr.splice(i,1);
			}
		};
		return this.each(function(){
			AudioPlay.init();
		});
	};
})(jQuery);