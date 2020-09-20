//jshint esversion:6

// const { isUndefined } = require("util");

// DOM Elements
const readingTime = document.querySelector(".reading-time");
const thinkingTime = document.querySelector(".thinking-time");
const codingTime = document.querySelector(".coding-time");
const debuggingTime = document.querySelector(".debugging-time");
const totalTime = document.querySelector(".total-time");
const currentTime = document.querySelector(".current-time");
const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const pauseBtn = document.querySelector(".pause-btn");
const restartBtn = document.querySelector(".restart-btn");
const resetBtn = document.querySelector(".reset-btn");
const counter = document.querySelector(".counter");
const minutesTime = document.querySelector(".minutes-time");
const secondsTime = document.querySelector(".seconds-time");

const times = [readingTime, thinkingTime, codingTime, debuggingTime];

// Check if counter exists in local storage
let localStorageCounter = localStorage.getItem("localCounter");

if (localStorageCounter !== null) {
  localStorageCounter = parseInt(localStorageCounter);
  counter.textContent = localStorageCounter;
} else {
  localStorageCounter = 0;
}

let time = 0;
let index = 0;
let interval;
console.log(interval);
// Event Listeners
playBtn.addEventListener("click", startCounting);
stopBtn.addEventListener("click", stopCounting);
pauseBtn.addEventListener("click", pauseCounting);
restartBtn.addEventListener("click", () => {
  location.reload();
});
resetBtn.addEventListener("click", () => {
  localStorageCounter = 0;
  counter.textContent = 0;
  localStorage.setItem("localCounter", localStorageCounter);
});

// Functions

// Start Counter
function startCounting() {
  playBtn.style.display = "none";
  pauseBtn.style.display = "block";
  interval = setInterval(() => {
    time++;
    console.log("minutes " + parseInt(time / 60));
    console.log("seconds " + (time % 60));
    let minutes = parseInt(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutesTime.textContent = "0" + minutes;
    } else {
      minutesTime.textContent = minutes;
    }

    if (seconds < 10) {
      secondsTime.textContent = "0" + seconds;
    } else {
      secondsTime.textContent = seconds;
    }
    // currentTime.textContent = time;
  }, 1000);
}

// Stop Counter
function stopCounting() {
  if (time !== 0) {
    pauseBtn.style.display = "none";
    playBtn.style.display = "block";
    updateTime();
    clearInterval(interval);
    // currentTime.textContent = 0;
    time = 0;
    minutesTime.textContent = "00";
    secondsTime.textContent = "00";
  }
}

// Pause Counter
function pauseCounting() {
  pauseBtn.style.display = "none";
  playBtn.style.display = "block";
  clearInterval(interval);
}

// Update time
function updateTime() {
  if (index === 3) {
    times[index].textContent = `${parseInt(Math.round(time / 60))}`;
    times[index].style.color = "red";
    // Calculate total time
    let total =
      parseInt(readingTime.textContent) +
      parseInt(codingTime.textContent) +
      parseInt(thinkingTime.textContent) +
      parseInt(debuggingTime.textContent);
    let unitOfTime = total === 1;
    totalTime.textContent = unitOfTime ? `${total} minute` : `${total} minutes`;

    // Show restart button
    stopBtn.style.display = "none";
    playBtn.style.display = "none";
    restartBtn.style.display = "block";

    // Update Counter
    localStorageCounter++;
    counter.textContent = localStorageCounter;
    localStorage.setItem("localCounter", localStorageCounter);
  } else {
    times[index].textContent = `${parseInt(Math.round(time / 60))}`;
    times[index].style.color = "red";
    index++;
  }
}
