const addNewButton = document.querySelector(".global-data__button--add-new");
const tableBody = document.querySelector(".timer-table__landmark--body");
const tableTemplate = document.querySelector(".timer-table__template");

function handleStartButton(e) {
  const selector = "timer-table__action--start";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimer = e.originalTarget;
  const isRunning = activeTimer.getAttribute("data-running");
  const startTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--start")
  );

  startTimerButtons.forEach((item) => {
    if (item != activeTimer) {
      item.setAttribute("data-running", "false");
      item.innerText = "Start";
    } else {
      if (isRunning === "true") {
        item.setAttribute("data-running", "false");
        item.innerText = "Start";
      } else {
        item.setAttribute("data-running", "true");
        item.innerText = "Stop";
      }
    }
  });
}

function handleDeleteButton() {
  const selector = "timer-table__action--delete";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimer = e.originalTarget;
  const deleteTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--delete")
  );
}

function handleMergeButton() {
  const selector = "timer-table__action--merge";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimer = e.originalTarget;
  const mergeTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--merge")
  );
}

function handleMoveButton() {
  const selector = "timer-table__action--move";
  if (!e.target.classList.contains(selector)) {
    return;
  }

  const activeTimer = e.originalTarget;
  const moveTimerButtons = Array.from(
    document.querySelectorAll(".timer-table__action--move")
  );
}

function handleAddNewItem() {
  tableBody.appendChild(tableTemplate.content.cloneNode(true));
}

addNewButton.addEventListener("click", handleAddNewItem);
document.addEventListener("click", handleStartButton);
document.addEventListener("click", handleDeleteButton);
document.addEventListener("click", handleMergeButton);
document.addEventListener("click", handleMoveButton);

handleAddNewItem();
