const btnBack = document.getElementById("anterior");
const btnPlayPause = document.getElementById("play-pause");
const btnSkip = document.getElementById("proximo");
const audioCapitulo = document.getElementById("audio-capitulo");
const progressBar = document.getElementById('progress-bar')
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
let capitulo = document.getElementById('capitulo')

const numeroCapitulos = 10;
let playPause = false;
let capituloAtual = 1;

function tocarFaixa() {
  if (!playPause) {
    audioCapitulo.play();
    btnPlayPause.classList.remove("bi-play-circle-fill");
    btnPlayPause.classList.add("bi-pause-circle-fill");
    playPause = true;
  } else {
    audioCapitulo.pause();
    btnPlayPause.classList.remove("bi-pause-circle-fill");
    btnPlayPause.classList.add("bi-play-circle-fill");
    playPause = false;
  }
}

function proximaFaixa() {
  if (capituloAtual === numeroCapitulos) {
    capituloAtual = 1;
    capitulo.innerHTML = `Capítulo ${capituloAtual}`
  } else {
    capituloAtual += 1;
    capitulo.innerHTML = `Capítulo ${capituloAtual}`

  }

  audioCapitulo.src = `books/dom-casmurro/${capituloAtual}.mp3`;
  playPause = false
  tocarFaixa()
}

function voltarFaixa() {
  if ((capituloAtual === 1)) {
    capituloAtual = numeroCapitulos;
    capitulo.innerHTML = `Capítulo ${capituloAtual}`
  } else {
    capituloAtual -= 1;
    capitulo.innerHTML = `Capitulo ${capituloAtual}`
  }
  audioCapitulo.src = `books/dom-casmurro/${capituloAtual}.mp3`;
  playPause = false
  tocarFaixa()
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

btnPlayPause.addEventListener("click", tocarFaixa);
btnSkip.addEventListener("click", proximaFaixa);
btnBack.addEventListener("click", voltarFaixa);

audioCapitulo.addEventListener("timeupdate", () => {
  if (progressBar && isFinite(audioCapitulo.duration)) {
      progressBar.value = audioCapitulo.currentTime;
      progressBar.max = audioCapitulo.duration;
      currentTime.textContent = formatTime(audioCapitulo.currentTime);
      duration.textContent = formatTime(audioCapitulo.duration);
  }
});
