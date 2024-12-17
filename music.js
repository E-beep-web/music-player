let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let isMuted = false;
const muteButton = document.querySelector('.mute-button');

//muteButton.addEventListener('click', () => {
   // isMuted = !isMuted;
    //audioElement.muted = isMuted;
    //muteButton.innerHTML = isMuted ? '<i class="fa fa-volume-mute"></i>' : '<i class="fa fa-volume-up"></i>';
//});
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case ' ':
            
            if (audioElement.paused) {
                audioElement.play();
            } else {
                audioElement.pause();
            }
            break;
        case 'ArrowRight':
         
            playNextTrack();
            break;
        case 'ArrowLeft':
           
            playPreviousTrack();
            break;
    }
});

let track_index = 0;
let isPlaying = false;
let updateTimer;


let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Night Owl",
        artist: "Broke For Free",
        image: "https://images.pexels.com/photos/2264753/pexels-photo-2264753.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
    },
    {
      name: "Jazz Comedy",
      artist: "Bensound",
      image: "https://images.pexels.com/photos/2604071/pexels-photo-2604071.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
      path: "https://www.bensound.com/bensound-music/bensound-jazzcomedy.mp3"
    },
    {
      name: "Little Idea",
      artist: "Bensound",
      image: "https://images.pexels.com/photos/3716559/pexels-photo-3716559.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
      path: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3"
    },
    {
        name: "Enthusiast",
        artist: "Tours",
        image: "https://images.pexels.com/photos/3100835/pexels-photo-3100835.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
    },
    {
        name: "Shipping Lanes",
        artist: "Chad Crouch",
        image: "https://images.pexels.com/photos/1717969/pexels-photo-1717969.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=250&w=250",
        path: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
    },
    {
        name: "Cute",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/206508/pexels-photo-206508.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-cute.mp3"
      },
      {
        name: "Better Days",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/3824533/pexels-photo-3824533.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-betterdays.mp3"
      },
      {
        name: "Going Higher",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/207594/pexels-photo-207594.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-goinghigher.mp3"
      },
      {
        name: "Adventure",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/1797775/pexels-photo-1797775.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-adventure.mp3"
      },
      {
        name: "Summer",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/4080695/pexels-photo-4080695.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-summer.mp3"
      },
      {
        name: "Acoustic Breeze",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-acousticbreeze.mp3"
      },
      {
        name: "The Jazz Piano",
        artist: "Bensound",
        image: "https://images.pexels.com/photos/3861567/pexels-photo-3861567.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=250&w=250",
        path: "https://www.bensound.com/bensound-music/bensound-thejazzpiano.mp3"
    },
    
  ];
  
  

///function random_bg_color() {

  
 // let red = Math.floor(Math.random() * 256) + 64;
  //let green = Math.floor(Math.random() * 256) + 64;
  //let blue = Math.floor(Math.random() * 256) + 64;

  
  //let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  
  //document.body.style.background = bgColor;
//}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
 // random_bg_color();
}

//const colors = ['#FF5733', '#33FF57', '#3357FF']; 
//let currentTrackIndex = 0;

//function changeBackgroundColor() {
   // document.body.style.backgroundColor = colors[currentTrackIndex];
    //currentTrackIndex = (currentTrackIndex + 1) % colors.length;
//}

audioElement.addEventListener('timeupdate', () => {
    const currentTime = Math.floor(audioElement.currentTime);
    const duration = Math.floor(audioElement.duration);
    document.querySelector('.current-time').innerText = formatTime(currentTime);
    document.querySelector('.total-duration').innerText = formatTime(duration);
    const progressPercent = (currentTime / duration) * 100;
    document.querySelector('.seek_slider').value = progressPercent;
});



function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
const canvas = document.getElementById('audioVisualizer');
const ctx = canvas.getContext('2d');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();

function setupVisualizer() {
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function draw() {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const barWidth = (canvas.width / bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];
            ctx.fillStyle = `rgb(${barHeight + 100},50,50)`;
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    draw();
}

audioElement.onplay = () => {
    audioContext.resume().then(() => {
        setupVisualizer();
    });
};
const swiperWrapper = document.querySelector('.swiper-wrapper');

track_list.forEach(track => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
        <img src="${track.image}" alt="${track.name}">
        <h3>${track.name}</h3>
        <p>${track.artist}</p>
    `;
    swiperWrapper.appendChild(slide);
});

