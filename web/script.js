const addNewButton = document.querySelector(".global-data__button--add-new");
const tableBody = document.querySelector(".timer-table__landmark--body");
const tableTemplate = document.querySelector(".timer-table__template");
let currentTimerTime;
let currentTimerTimeSlot;
let totalTime;

function startTheClock() {
  const activeTimerStartButton = document.querySelector('[data-running="true"]');
  const activeTimer = activeTimerStartButton.closest('.timer-table__row');
  currentTimerTimeSlot = activeTimer.querySelector('.timer-table__cell--time-spent');
  currentTimerTime = parseInt(activeTimer.querySelector('.timer-table__cell--time-spent').innerText);
  console.log(currentTimerTime);
  setInterval(() => {
    currentTimerTime = currentTimerTime + 1;
    currentTimerTimeSlot.innerText = currentTimerTime;
  }, 1000);
}

function stopTheClock() {
  console.log('clock stopped');
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
