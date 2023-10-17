var player = videojs('videoPlayer');

var mirrorButton = player.controlBar.addChild('button', {}, 1); // Add mirror button
mirrorButton.el().innerHTML = '<img id="mirrorIcon" class="mirror-icon" src="icons/mirror off.svg" alt="Moop Icon">';
mirrorButton.el().setAttribute('title', 'Mirror Video');
mirrorButton.el().style.fontSize = '1.5em';
mirrorButton.el().style.cursor = 'pointer';

mirrorButton.on('click', function () {
    player.toggleClass('vjs-mirrored');
    if (player.hasClass('vjs-mirrored')) {
        mirrorButton.el().querySelector('.mirror-icon').src = "icons/mirror on.svg";
    } else {
        mirrorButton.el().querySelector('.mirror-icon').src = "icons/mirror off.svg";
    }
});
