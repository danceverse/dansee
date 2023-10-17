var player = videojs('videoPlayer');

var customControl = player.controlBar.addChild('button', { text: 'Speed' });
customControl.addClass('sliderclass'); 
customControl.el().style.cursor = 'pointer';
customControl.el().setAttribute('title', 'Change Playback Speed');

var speedSlider = document.createElement('input');
speedSlider.type = 'range';
speedSlider.min = '0.25';
speedSlider.max = '2.00';
speedSlider.step = '0.05';
speedSlider.value = '1.00';
speedSlider.style.display = 'none';
speedSlider.className = 'speed-slider';

var playbackSpeedIcon = document.createElement('i');
playbackSpeedIcon.className = 'material-icons';
playbackSpeedIcon.textContent = 'slow_motion_video';

var valueDisplay = document.createElement('span');
valueDisplay.className = 'slider-value';
valueDisplay.textContent = speedSlider.value;

speedSlider.addEventListener('touchstart', function (e) {
  // Prevent the default touchmove behavior (scrolling)
  e.preventDefault();
  document.body.classList.add('disable-scroll');
});

speedSlider.addEventListener('touchend', function () {
  // Remove the class to re-enable scrolling
  document.body.classList.remove('disable-scroll');
});


customControl.on('click', function() {
  if (speedSlider.style.display === 'none') {
    speedSlider.style.display = 'block';
  } else {
    speedSlider.style.display = 'none';
  }
});

//var initialSpeed = parseFloat(speedSlider.value).toFixed(2);
valueDisplay.textContent = parseFloat(speedSlider.value).toFixed(2) + 'x';

speedSlider.addEventListener('input', function () {
  var speed = parseFloat(speedSlider.value);
  player.playbackRate(speed);
  
  valueDisplay.textContent = speed.toFixed(2) + 'x';
});

//customControl.el().appendChild(playbackSpeedIcon);
customControl.el().appendChild(valueDisplay);
customControl.el().appendChild(speedSlider);