const target = document.getElementById("target");
const score_text = document.getElementById("score");
const timer_text = document.getElementById("timer");
const start_button = document.getElementById("start");
const screen_field = document.getElementById("screen");
const accuracy_text = document.getElementById("accuracy");
const bullets_text = document.getElementById("bullets");

const max_X = 80;
const max_Y = 45;
let score = 0;
let time = 59;
let shotsFired = 0;
let hits = 0;
let misses = 0;
let interval = null;
let start_restart = true;
let bullets = 7;

target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
start_button.addEventListener("click", function () {
  if (start_restart) {
    time = 59;
    score = 0;
    shotsFired = 0;
    hits = 0;
    misses = 0;
    bullets = 7;

    score_text.textContent = `Score: ${score}`;
    timer_text.textContent = `Timer: ${time}`;
    accuracy_text.textContent = "Accuracy: 0%";
    bullets_text.textContent = `Remaining Bullets: ${bullets}`;

    start_button.style.transition = "0s";
    start_button.style.visibility = "hidden";

    target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
    target.style.visibility = "visible";
    target.style.transition = "0.5s";
    start_restart = false;
  } else {
    time = 59;
    score = 0;
    shotsFired = 0;
    hits = 0;
    misses = 0;
    bullets = 7;

    score_text.textContent = `Score: ${score}`;
    timer_text.textContent = `Timer: ${time}`;
    accuracy_text.textContent = "Accuracy: 0%";
    bullets_text.textContent = `Remaining Bullets: ${bullets}`;

    start_button.style.transition = "0s";
    start_button.style.visibility = "hidden";

    target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
    target.style.visibility = "visible";
    target.style.transition = "0.5s";
    start_restart = true;
  }
  interval = setInterval(Timer, 1000);
});

target.addEventListener("mousedown", function () {
  if (bullets > 0) {
    shotsFired++;
    score++;
    hits++;

    let gunsound = new Audio("../extras/gun.mp3");
    gunsound.play();
    target.style.transform = `translate(${Math.random() * max_X}vh,${Math.random() * max_Y}vh)`;
    score_text.textContent = `Score: ${score}`;

    bullets--;
    bullets_text.textContent = `Remaining Bullets: ${bullets}`;

    const accuracyPercentage = (hits / shotsFired) * 100;
    accuracy_text.textContent = `Accuracy: ${accuracyPercentage.toFixed(2)}%`;

    if (bullets === 0) {
        bullets_text.textContent = "Out of Bullets. Press R to reload"
        reloadBullets();
    }
  }
});

screen_field.addEventListener("mousedown", function (event) {
  if (event.target === screen_field && bullets > 0) {
    shotsFired++;
    bullets--;
    bullets_text.textContent = `Remaining Bullets: ${bullets}`;

    const accuracyPercentage = (hits / shotsFired) * 100;
    accuracy_text.textContent = `Accuracy: ${accuracyPercentage.toFixed(2)}%`;

    if (bullets === 0) {
      bullets_text.textContent = "Out of Bullets. Press R to reload"
        reloadBullets();
    }
  }
});

function reloadBullets() {
  let reload = new Audio("../extras/reload.mp3")
  reload.play();
  bullets = 7;
  bullets_text.textContent = `Remaining Bullets: ${bullets}`;
}


function Timer() {
  time--;
  if (time <= 9) {
    timer_text.textContent = `Timer: 0${time}`;
  } else {
    timer_text.textContent = `Timer: ${time}`;
  }
  if (time <= 0) {
    clearInterval(interval);
    Restart();
  }
}

function Restart() {
  start_button.style.transition = "0.5s";
  start_button.style.visibility = "visible";
  start_button.textContent = "RESTART";

  target.style.transition = "0s";
  target.style.visibility = "hidden";
}
