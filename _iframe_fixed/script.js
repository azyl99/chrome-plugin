
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
shortcut.add("Space",function() {
	if (audio.paused){
		audio.play();
	} else {
		audio.pause();
	}
});

shortcut.add("Left", function() {
	audio.currentTime -= 3;
	audio.currentTime = audio.currentTime < 0 ? 0 : audio.currentTime;
});

shortcut.add("Left", function() {
	audio.currentTime -= 3;
	if (audio.currentTime < 0) {
		audio.currentTime = 0
	}
});

shortcut.add("Right", function() {
	audio.currentTime += 3;
	if (audio.currentTime > audio.duration) {
		audio.currentTime = audio.duration
	}
});