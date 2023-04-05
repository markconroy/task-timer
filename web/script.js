const addNewButton = document.querySelector(".global-data__button--add-new");
const tableBody = document.querySelector(".timer-table__landmark--body");
const tableTemplate = document.querySelector(".timer-table__template");
let startTimer;
let currentTimerTime;
let currentTimerTimeSlot;
let totalTime;

function convertSecondsToTime(totalSeconds) {

  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return { h: hours, m: minutes, s: seconds };
}

function startTheClock() {
  const activeTimerStartButton = document.querySelector('[data-running="true"]');
  const activeTimer = activeTimerStartButton.closest('.timer-table__row');

  currentTimerTimeSlot = activeTimer.querySelector('.timer-table__cell--time-spent');
  currentTimerTime = parseInt(activeTimer.querySelector('.timer-table__cell--time-spent').innerText);

  clearInterval(startTimer);
  startTimer = setInterval(() => {
    currentTimerTime = currentTimerTime + 1;
    const secondsToTime = convertSecondsToTime(currentTimerTime);
    currentTimerTimeSlot.innerText = `${currentTimerTime >= 3600 ? secondsToTime.h + 'h -' : ''} ${currentTimerTime >= 60 ? secondsToTime.m + 'm -' : ''} ${' ' + secondsToTime.s}s`;
  }, 1000);
}

function stopTheClock() {
  clearInterval(startTimer);
}

function handleStartButton(e) {
  const selector = "timer-table__action--start";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimerStartButton = e.originalTarget;
  const activeTimer = activeTimerStartButton.closest('.timer-table__row');
  const isRunning = activeTimerStartButton.getAttribute("data-running");
  const startTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--start")
  );

  startTimerButtons.forEach((startTimerButton) => {
    if (startTimerButton != activeTimerStartButton) {
      startTimerButton.setAttribute("data-running", "false");
      startTimerButton.innerText = "Start";
    } else {
      if (isRunning === "true") {
        startTimerButton.setAttribute("data-running", "false");
        startTimerButton.innerText = "Start";
        stopTheClock();
      } else {
        startTimerButton.setAttribute("data-running", "true");
        startTimerButton.innerText = "Stop";
        startTheClock();
      }
    }
  });
}

function handleDeleteButton(e) {
  const selector = "timer-table__action--delete";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimerStartButton = e.originalTarget;
  const activeTimer = activeTimerStartButton.closest('.timer-table__row');
  const deleteTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--delete")
  );
}

function handleEditTimeButton(e) {
  const selector = "timer-table__action--edit-time";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimerStartButton = e.originalTarget;
  const activeTimer = activeTimerStartButton.closest('.timer-table__row');
  const editTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--edit-time")
  );
}

function handleAddNewItem() {
  tableBody.appendChild(tableTemplate.content.cloneNode(true));
}

addNewButton.addEventListener("click", handleAddNewItem);
document.addEventListener("click", handleStartButton);
document.addEventListener("click", handleDeleteButton);
document.addEventListener("click", handleEditTimeButton);

handleAddNewItem();
