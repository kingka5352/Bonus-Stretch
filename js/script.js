// state
const baseLength = 10;
const maxLevel = 10;
let level = 1;
let path = [];
let step = 0;

// elements
const pathDisplay = document.getElementById("pathDisplay");
const guessInput = document.getElementById("guessInput");
const submitBtn = document.getElementById("submitGuess");
const message = document.getElementById("message");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const img = document.getElementById("feedbackImage");
const levelNum = document.getElementById("levelNum");
const seqLen = document.getElementById("seqLen");
const stepNum = document.getElementById("stepNum");

// image swap
const showImage = (kind) => {
  let src = "images/bridge-neutral.png";
  if (kind === "left") src = "images/bridge-left.png";
  else if (kind === "right") src = "images/bridge-right.png";
  else if (kind === "safe") src = "images/bridge-safe.png";
  else if (kind === "fell") src = "images/bridge-fell.png";
  img.src = src;
};

// show then hide
const revealThenHide = (text, ms = 7000) => {
  pathDisplay.textContent = text;
  setTimeout(() => {
    pathDisplay.textContent = "•".repeat(path.length);
  }, ms);
};

// build path
const makePath = (len) => {
  path = [];
  for (let i = 0; i < len; i++) {
    path.push(Math.random() < 0.5 ? "L" : "R");
  }
};

// start level
const startLevel = () => {
  const len = baseLength + (level - 1);
  levelNum.textContent = level;
  seqLen.textContent = len;
  step = 0;
  stepNum.textContent = step;
  message.textContent = "";
  score.textContent = "";
  guessInput.value = "";
  submitBtn.disabled = false;
  guessInput.disabled = false;
  nextLevelBtn.style.display = "none";
  restartBtn.style.display = "none";
  showImage("neutral");
  makePath(len);
  revealThenHide(path.join(" "));
};

// win
const winLevel = () => {
  showImage("safe");
  message.textContent = "Level " + level + " cleared!";
  submitBtn.disabled = true;
  guessInput.disabled = true;
  if (level < maxLevel) nextLevelBtn.style.display = "inline-block";
  else restartBtn.style.display = "inline-block";
};

// fail
const fail = () => {
  showImage("fell");
  message.textContent = "You fell! Try again.";
  submitBtn.disabled = true;
  guessInput.disabled = true;
  restartBtn.style.display = "inline-block";
};

// check
const checkGuess = () => {
  const v = (guessInput.value || "").trim().toUpperCase();
  if (v !== "L" && v !== "R") {
    message.textContent = "Enter L or R.";
    return;
  }
  showImage(v === "L" ? "left" : "right");
  if (path[step] === v) {
    step += 1;
    stepNum.textContent = step;
    message.textContent = "Safe!";
    score.textContent = "Progress: " + step + " / " + path.length;
    if (step === path.length) winLevel();
  } else {
    fail();
  }
  guessInput.value = "";
  guessInput.focus();
};

// restart
const restart = () => { startLevel(); };

// next
const next = () => {
  level += 1;
  if (level > maxLevel) level = maxLevel;
  startLevel();
};

// events
submitBtn.addEventListener("click", () => checkGuess());
guessInput.addEventListener("keyup", (e) => { if (e.key === "Enter") checkGuess(); });
restartBtn.addEventListener("click", () => restart());
nextLevelBtn.addEventListener("click", () => next());

// start
startLevel();
