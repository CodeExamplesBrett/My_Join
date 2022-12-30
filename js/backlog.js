let colorsOfUrgency = {
  low: "../img/icons_google/low-icon.png",
  medium: "../img/icons_google/medium-icon.png",
  high: "../img/icons_google/high-icon.png",
};


async function showBacklogTask() {
  await init('backlog-link');
  renderBacklogTasks();
}


function renderBacklogTasks() {
  let backlogtable = document.getElementById("backlogTable");
  backlogtable.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const backlogTask = tasks[i];
    const colorOfUrgency = colorsOfUrgency[backlogTask["urgency"]];
    if (backlogTask.status == "backlog") {
      backlogtable.innerHTML += backlogTableHTML(i, colorOfUrgency);
    }
  }
}


function loadUser(i) {
  let task = tasks[i];

  for (let j = 0; j < task.user.length; j++) {
    const user = task.user[j];
    document.getElementById(`user-names${i}`).innerHTML += /*html*/ `
    <div class="user-images-names">
         <img class="user-img" src="${user.img}" alt="">
         <span class="user-name">${user.name}</span>
    </div>
        `;
  }
}


//Displays dialogbox with details and option to add to board with button
function addToBoard(i) {
  let dialogInfo = document.getElementById("dialog-info");
  let dialogBox = document.getElementById("dialog-box");
  dialogBox.style.display = "flex";
  dialogBox.classList.remove("d-none");

  dialogInfo.innerHTML = addTaskDetailsToDialogbox(i);
  loadUser(i);
}


function closeBox() {
  let closeDialog = document.getElementById("dialog-box");
  closeDialog.classList.add("d-none");
}


function pushToBoard(i) {
  tasks[i].status = "todo";
  closeBox();
  setArray("tasks", tasks);
  renderBacklogTasks();
}


function setArray(key, array) {
  backend.setItem(key, JSON.stringify(array));
}
