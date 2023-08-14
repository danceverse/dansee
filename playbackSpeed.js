var player = videojs('videoPlayer');
var myButton = player.controlBar.addChild('button', {}, 0);
var myButtonDom = myButton.el();
myButtonDom.innerHTML = '<i class="material-icons">slow_motion_video</i>';

myButtonDom.onclick = function() {
    var input = prompt('Enter playback rate between -2 and 2', '1.0');

    if (input !== null) {
        var playRate = parseFloat(input);
        if (!isNaN(playRate) && playRate >= -2 && playRate <= 2) {
            player.playbackRate(playRate);
        } else {
            alert('Please enter valid playback rate between -2 and 2.')
        }
    }
};
