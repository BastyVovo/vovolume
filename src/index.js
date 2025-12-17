import { ads } from "./data.js";

const showAdButton = document.getElementById("showAdButton");
const dialog = document.getElementById("adsTemp");
const closeBtn = document.querySelector(".close-ad");
const countdown = document.querySelector(".countdown");
const inputRange = document.getElementById("volume");
const adTitle = document.querySelector(".ad-title");
const adDescription = document.querySelector(".ad-description");
const adCta = document.querySelector(".ad-cta");

let startTime = null;
let max = 100;
let countdownInterval = null;
let elapsedTime = 0;

let adDuration;

function getRandomDuration() {
  return Math.floor(Math.random() * max);
}

function getRandomAd() {
  return ads[Math.floor(Math.random() * ads.length)];
}

function loadAd(ad) {
  adTitle.innerHTML = ad.title;
  adDescription.textContent = ad.description;
  adCta.textContent = ad.cta;
}

function startCountdown() {
  startTime = Date.now();
  elapsedTime = 0;

  adDuration = getRandomDuration();

  countdownInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const remaining = Math.max(0, adDuration - elapsedTime);
    
    countdown.innerHTML = `Ad closes in <span class="spinning">${remaining}</span>s`;
    
    if (elapsedTime >= adDuration) {
      closeAd();
      inputRange.value = "100";
    }
  }, 1000);
}

function startAd() {
  const randomAd = getRandomAd();
  loadAd(randomAd);
  
  elapsedTime = 0;
  startTime = null;
  
  dialog.showModal();
  startCountdown();
}

function getRangeValue() {
  if (!startTime || elapsedTime === 0) return 0;
  const percentage = Math.min(100, (elapsedTime / adDuration) * 100);
  return Math.round(percentage);
}

function closeAd() {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
  
  dialog.close();
  countdown.textContent = "";
  
  const rangeValue = getRangeValue();
  inputRange.value = rangeValue;
}

showAdButton.addEventListener("click", startAd);
closeBtn.addEventListener("click", closeAd);

document.getElementById("adCtaButton").addEventListener("click", () => {
  alert("LOL!");
});

dialog.addEventListener("close", () => {
  if (countdownInterval) {
    closeAd();
  }
});