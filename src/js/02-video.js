import Player from '@vimeo/player';
import throttle from 'lodash.throttle'

const iframe = document.querySelector('iframe');
    const player = new Player(iframe);

    player.on('timeupdate', throttle(function(data) {
        localStorage.setItem("videoplayer-current-time", JSON.stringify(data.seconds));
    }), 1000);

const currentTime = localStorage.getItem("videoplayer-current-time");

player.setCurrentTime(currentTime);

