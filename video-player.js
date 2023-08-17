var player = videojs('videoPlayer', {
    fluid: true,
    aspectRatio: '16:9',
    sources: []
});

document.getElementById('goButton').addEventListener('click', function () {
    var youtubeLink = document.getElementById('youtubeLink').value;

    player.src({
        type: 'video/youtube',
        src: youtubeLink
    });

    document.getElementById('link-input').style.display = 'none';
    document.getElementById('video-section').style.display = 'flex';
});
