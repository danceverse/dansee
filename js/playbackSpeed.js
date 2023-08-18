var player = videojs('videoPlayer');
var speedSlider = document.getElementById('speedSlider');

speedSlider.addEventListener('input', function() {
    var playbackRate = parseFloat(speedSlider.value);
    player.playbackRate(playbackRate);
});
