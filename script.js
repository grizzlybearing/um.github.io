document.addEventListener('DOMContentLoaded', function () {
 

  const stars = document.querySelectorAll('.star');

  const svg = document.querySelector('.connecting-lines');
  const svgNS = 'http://www.w3.org/2000/svg';
  const polyline = document.createElementNS(svgNS, 'polyline');
  polyline.setAttribute('fill', 'none');
  polyline.setAttribute('stroke', '#fff');
  polyline.setAttribute('stroke-width', '2');

  let points = [];

  // Определяем соединяемые звезды по data-id
  const connections = [
      { from: 'star10', to: 'star11' },
      { from: 'star11', to: 'star9' },
      { from: 'star10', to: 'star8' },
      { from: 'star5', to: 'star8' },
      { from: 'star5', to: 'star9' },
      { from: 'star9', to: 'star6' },
      { from: 'star6', to: 'star7' },
  
  ];

  connections.forEach(connection => {
    const fromStar = document.querySelector(`[data-id="${connection.from}"]`);
    const toStar = document.querySelector(`[data-id="${connection.to}"]`);

    const fromX = parseFloat(fromStar.style.left) + parseFloat(fromStar.offsetWidth) / 2;
    const fromY = parseFloat(fromStar.style.top) + parseFloat(fromStar.offsetHeight) / 2;
    const toX = parseFloat(toStar.style.left) + parseFloat(toStar.offsetWidth) / 2;
    const toY = parseFloat(toStar.style.top) + parseFloat(toStar.offsetHeight) / 2;

    points.push(`${fromX},${fromY} ${toX},${toY}`);
});


  if (points.length > 0) {
      polyline.setAttribute('points', points.join(' '));
      svg.appendChild(polyline);
  }

  const flower = document.querySelector('.flower');
  flower.addEventListener('click', function () {
      flower.classList.toggle('animate');
  });

  const audio = document.getElementById('myAudio');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const currentTimeDisplay = document.getElementById('currentTime');
  const durationDisplay = document.getElementById('duration');

  playPauseBtn.addEventListener('click', togglePlayPause);

  audio.addEventListener('timeupdate', updateProgress);

  function togglePlayPause() {
      if (audio.paused) {
          audio.play();
          playPauseBtn.textContent = 'Pause';
      } else {
          audio.pause();
          playPauseBtn.textContent = 'Play';
      }
  }

  function updateProgress() {
      const currentTime = formatTime(audio.currentTime);
      const duration = formatTime(audio.duration);
      currentTimeDisplay.textContent = currentTime;
      durationDisplay.textContent = duration;
  }

  function formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
});
