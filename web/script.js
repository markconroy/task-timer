const addNewButton = document.querySelector(".global-data__button--add-new");
const tableBody = document.querySelector(".timer-table__landmark--body");
const tableTemplate = document.querySelector(".timer-table__template");
let startTimer;
let currentTimerTime = 0;
let currentTimerTimeSlot;
let totalTime;
let roundedMinutes;
let roundedHours;

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
  currentTimerRoundedSlot = activeTimer.querySelector('.timer-table__cell--time-rounded');
  currentTimerTime = parseInt(activeTimer.getAttribute('data-seconds'));

  clearInterval(startTimer);
  startTimer = setInterval(() => {
    currentTimerTime = currentTimerTime + 1;
    const secondsToTime = convertSecondsToTime(currentTimerTime);
    if (currentTimerTime >= 3600) {
      roundedHours = secondsToTime.h;
    } else {
      roundedHours = 0;
    }
    if (secondsToTime.m > 0 && secondsToTime.m < 7) {
      roundedMinutes = 0;
    } else if (secondsToTime.m >= 7 && secondsToTime.m < 22) {
      roundedMinutes = 15;
    } else if (secondsToTime.m >= 22 && secondsToTime.m < 37) {
      roundedMinutes = 30;
    } else if (secondsToTime.m >= 37 && secondsToTime.m < 52) {
      roundedMinutes = 45;
    } else if ( secondsToTime.m >= 52 && secondsToTime.m < 60) {
      roundedMinutes = 0;
      roundedHours = roundedHours + 1;
    }
    currentTimerTimeSlot.innerText = `${currentTimerTime >= 3600 ? secondsToTime.h + 'h -' : ''} ${currentTimerTime >= 60 ? secondsToTime.m + 'm -' : ''} ${' ' + secondsToTime.s}s`;
    currentTimerRoundedSlot.innerText = `${roundedHours + 'h -'} ${roundedMinutes}m`;
    activeTimer.setAttribute('data-seconds', currentTimerTime);
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
