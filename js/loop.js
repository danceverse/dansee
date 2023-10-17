var player = videojs('videoPlayer');
var startLoopTime = null;
var endLoopTime = null;
var isLooping = false;
var loopCounter = 0;
var loopedSection = null;
var loopButton = player.controlBar.addChild('button', {}, 1); // Add loop button

// loopButton.el().innerHTML = '<span class="vjs-icon-repeat"></span>';
loopButton.el().innerHTML = '<img id="loopIcon" class="loop-icon" src="icons/Unselected.svg" alt="Loop Icon">';
loopButton.el().setAttribute('title', 'Loop Section');
loopButton.el().style.fontSize = '1.5em';
loopButton.el().style.cursor = 'pointer';

loopButton.on('click', function () {
    console.log('you just clicked the button!');
    loopCounter++;

    if (loopCounter === 3) { // Check if the third click
        isLooping = false;
        startLoopTime = null;
        endLoopTime = null;
        loopCounter = 0; // Reset the loop counter
        loopedSection.remove();
        loopButton.el().querySelector('.loop-icon').src = "icons/Unselected.svg";
    } else if (!isLooping) {
        startLoopTime = player.currentTime();
        isLooping = true;
        loopButton.el().querySelector('.loop-icon').src = "icons/Start Selected.svg";
    } else if (startLoopTime !== null) {
        endLoopTime = player.currentTime();
        updateLoopedSection();
        loopButton.el().querySelector('.loop-icon').src = "icons/Looped.svg";
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

