// ---------------- Final CPS Game (with cooldown) ----------------
let clickCount = 0;
let cpsStarted = false;
let isCooldown = false;
let cpsTimer, countdownTimer;

const clickBox = document.getElementById('click-box');
const timeSelect = document.getElementById('time-select');
const timerDisplay = document.getElementById('cps-timer');
const resultDisplay = document.getElementById('cps-result');

if (clickBox) {
  clickBox.addEventListener('click', () => {
    // If in cooldown, ignore all clicks
    if (isCooldown) return;

    if (!cpsStarted) {
      const totalTime = parseInt(timeSelect.value);
      let timeLeft = totalTime;

      cpsStarted = true;
      clickCount = 1; // First click
      resultDisplay.textContent = '';
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;

      countdownTimer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) clearInterval(countdownTimer);
      }, 1000);

      cpsTimer = setTimeout(() => {
        clearInterval(countdownTimer);
        cpsStarted = false;
        isCooldown = true;
        timerDisplay.textContent = 'Time Left: --';

        resultDisplay.innerHTML = `
          <strong>CPS:</strong> ${(clickCount / totalTime).toFixed(2)}<br>
          <strong>Score:</strong> ${clickCount}<br>
          <strong>Time:</strong> ${totalTime} second(s)
        `;
        clickCount = 0;
        setTimeout(() => {
          isCooldown = false;
        }, 1500);
      }, totalTime * 1000);
    } else {
      clickCount++;
    }
  });
}

let reactionStarted = false;
let reactionStartTime = 0;
let reactionTimeout;
let reactionClickable = false;

const reactionBox = document.getElementById('reaction-box');
const reactionResult = document.getElementById('reaction-result');

if (reactionBox) {
    reactionBox.addEventListener('click', () => {
        if (!reactionStarted) {
            reactionResult.textContent = '';
            reactionBox.style.backgroundColor = 'red';
            reactionBox.textContent = 'Wait for green...';
            reactionStarted = true;
            reactionClickable = false;

            const waitTime = Math.floor(Math.random() * 3000) + 2000;

            reactionTimeout = setTimeout(() => {
                reactionBox.style.backgroundColor = '#28a745';
                reactionBox.textContent = 'CLICK!';
                reactionStartTime = new Date().getTime();
                reactionClickable = true;
            }, waitTime);
        } else {
            if (!reactionClickable) {
                clearTimeout(reactionTimeout);
                reactionBox.textContent = 'Too soon!';
                reactionBox.style.backgroundColor = 'red';
                reactionResult.textContent = 'Too soon! Try again.';
                resetReaction();
            } else {
                const endTime = new Date().getTime();
                const reactionTime = endTime - reactionStartTime;
                reactionResult.textContent = `Your reaction time: ${reactionTime} ms`;
                reactionBox.textContent = 'Click to try again';
                reactionBox.style.backgroundColor = 'red';
                resetReaction();
            }
        }
    });

    function resetReaction() {
        reactionStarted = false;
        reactionClickable = false;
        clearTimeout(reactionTimeout);
    }
}
