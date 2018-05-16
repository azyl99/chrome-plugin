
console.log(2)

iframe = document.getElementById('play_ggl').children[1].children[0]
mp3src = iframe.contentDocument.getElementsByTagName('object')[0].getAttribute('data').split('=')[1]
audio = document.createElement('audio')
audio.setAttribute('src', mp3src)
audio.setAttribute('autoplay', 'autoplay')
audio.setAttribute('controls', 'controls')
audio.setAttribute('preload', 'preload')
audio.setAttribute('style', 'position:fixed; left:0px; bottom:0px; width:100%; z-index:9999;')
body=document.getRootNode().children[0].children[1]
body.appendChild(audio)


audio.currentTime = 15;// 设置播放起点为15秒
shortcut.add("space",function() {
	if (audio.paused){
		audio.play();
	} else {
		audio.pause();
	}
});
