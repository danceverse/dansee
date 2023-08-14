var player = videojs('videoPlayer');
var myButton = player.controlBar.addChild('button', {}, 1);
var myButtonDom = myButton.el();
myButtonDom.innerHTML = '<span class="vjs-icon-repeat"></span>';

myButtonDom.onclick = function() {
    
}