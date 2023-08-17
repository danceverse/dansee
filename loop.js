var player = videojs('videoPlayer');
var startLoopTime = null;
var endLoopTime = null;
var isLooping = false;
var loopCounter = 0;
var loopedSection = null;
var loopButton = player.controlBar.addChild('button', {}, 1); // Add loop button

// loopButton.el().innerHTML = '<span class="vjs-icon-repeat"></span>';
loopButton.el().innerHTML = '<i class="material-icons">loop</i>';
loopButton.el().style.fontSize = '1.5em';

loopButton.on('click', function () {
    console.log('you just clicked the button!');
    loopCounter++;

    if (loopCounter === 3) { // Check if the third click
        isLooping = false;
        startLoopTime = null;
        endLoopTime = null;
        loopCounter = 0; // Reset the loop counter
        loopedSection.remove();
    } else if (!isLooping) {
        startLoopTime = player.currentTime();
        isLooping = true;
    } else if (startLoopTime !== null) {
        endLoopTime = player.currentTime();
        updateLoopedSection();
    }
});

player.on('timeupdate', function () {
    console.log('the player tryna loop rn!');
    if (isLooping && startLoopTime !== null && endLoopTime !== null) {
        if (player.currentTime() >= endLoopTime) {
            player.currentTime(startLoopTime);
        }
    }
});

function updateLoopedSection() {
    console.log('section updated!');
    if (startLoopTime !== null && endLoopTime !== null) {
        const progressBarWidth = player.controlBar.progressControl.seekBar.el().offsetWidth;
        const startPercentage = (startLoopTime / player.duration()) * 100;
        const endPercentage = (endLoopTime / player.duration()) * 100;
        
        loopedSection = document.createElement('div');
        loopedSection.className = 'looped-section';
        loopedSection.style.left = startPercentage + '%';
        loopedSection.style.width = (endPercentage - startPercentage) + '%';
        
        player.controlBar.progressControl.seekBar.el().appendChild(loopedSection);
    }
}

