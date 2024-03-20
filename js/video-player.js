var player = videojs('videoPlayer', {
    fluid: true,
    aspectRatio: '16:9',
    sources: [],
    playsinline: true,
    webkitPlaysinline: true,
    //playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
    controlBar: {
        volumePanel: {
            inline: false,
        },
    },
});

document.getElementById('goButton').addEventListener('click', function () {
    var youtubeLink = document.getElementById('youtubeLink').value;

    player.src({
        type: 'video/youtube',
        src: youtubeLink
    });

    document.querySelector('.link-upload-overlay').style.display = 'none';
    document.querySelector('.video-section').style.display = 'flex';
});
