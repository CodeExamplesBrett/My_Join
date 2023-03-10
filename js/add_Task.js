//empty array for selected users, from all users dialog
let selectUser = [];


// jsdoc: npm install -g jsdoc

/**
 * This function reads input data from addTasks form pushes input to JSON-array then saves this array on backend server
 *
 * @param {string} event - on event here summit button click the default funtcion of the form is prevented so that processes in console can be seen and the page is not automatically reloaded.
 */
function addTask(event) {
  // function to prevent the default function of form being carried out
  event.preventDefault();
  //if statement to check if user has been assigned
  if (selectUser.length == 0) {
      warningAssignUser()
  } else {
    //otherwise push the data to json array
    handleCreateTask();
  }
}


function warningAssignUser() {
  document.getElementById("user-img").innerHTML = 
  //div with warning to assign a user
  /*html*/ `<div class="userWarning"><img class="Exclaim" src="./img/Exclaimation.png"><span>Assign user.</span></div>`
}


function handleCreateTask() {
  inputForTaskArray();
  resetFormObjects();
  showConfirmationText();
  // selected users array emptied
  selectUser = [];
  //Selected user/s displayed
  loadImages();
}


/**
 * This function creates a JSON for the form inputs and pushes this JSON into array "allTasks"
 *
 * @param {string} title - task name
 * @param {string} category - task category
 * @param {string} description - task description
 * @param {string} date - due date as string
 * @param {string} urgency task urgency
 */
 function inputForTaskArray() {
  // Variables saved as JSON , with .value the value of the form object is returned (writen this way so that the form can then be reset).

  // Variables for form objects to be saved in JSON
  let title = document.getElementById("title");
  let category = document.getElementById("category");
  let description = document.getElementById("description");
  let date = document.getElementById("due-date");
  let urgency = document.getElementById("urgency");

  createTaskJSON(title, category, description, date, urgency); 
}


function createTaskJSON(title, category, description, date, urgency){
  let task = {
    title: title.value,
    category: category.value,
    description: description.value,
    date: date.value,
    urgency: urgency.value,
    status: "backlog",
    // selected users from array "selectUser"
    user: selectUser
  };
  pushTaskToServerJSON(task);
}


function pushTaskToServerJSON(task){
    // Push JSON to array "tasks" auf server
  tasks.push(task);
  setArray("tasks", tasks);
  //console.log(tasks);
}


/**
 * This function resets all inputs in addTask form
 *
 * @param {string} title - task name
 * @param {string} category - task category
 * @param {string} description - task description
 * @param {string} date - due date as string
 * @param {string} urgency task urgency
 */
 function resetFormObjects() {
  // Reset form objects
  selectUser = [];
  //selected user images removed
  document.getElementById("user-img").innerHTML = "";
  title = document.getElementById("title").value = "";
  category = document.getElementById("category").value = "";
  escription = document.getElementById("description").value = "";
  date = document.getElementById("due-date").value = "";
  urgency = document.getElementById("urgency").value = "";
}


function showConfirmationText() {
    // task sent confirmation text displayed then turned off after 2 seconds
    document.getElementById(
      "confirm-text"
    ).innerHTML = /*html*/ `Task assigned successfully`;

    setTimeout(function () {
      document.getElementById("confirm-text").innerHTML = "";
    }, 4000);
  }


  /**
 * This function brings up dialog box with users to assign to the task (From array users on Backend server )
 */
function showUser() {

  //clear previous content
  document.getElementById("user-container").innerHTML = "";
  // Remove hidden class
  document.getElementById("bg-grey").classList.remove("d-none");
  // Iterate through users
  for (let i = 0; i < users.length; i++) {
    let userName = users[i]["name"];
    let userImg = users[i]["img"];
    let userMail = users[i]["mail"];

    //add data to dialogbox
    document.getElementById("user-container").innerHTML += 
    addUserDataToDialogbox(i, userName, userImg, userMail)
  }
  showCheckUp();
}


/**
 * This function addes the avitar and name to the add task dialog under heading "Assign to" -- to show which uses have been selected
 */
 function loadImages() {
  plusButtonCenter();

  // if the selected user array is not empty ---
  if (selectUser !== []) {
    document.getElementById("user-img").innerHTML = "";
    for (let i = 0; i < selectUser.length; i++) {
      let userName = selectUser[i].name;
      let userPic = selectUser[i].img;
      document.getElementById("user-img").innerHTML += `                                    
      <div class="added-user">
        <img class="avatar" src=${userPic}>
        <span>${userName}</span>
      </div>
      `;
    }
  }
} 


/**
 * This function addes class to "plus-svg" to align it with avitar image once added
 */
 function plusButtonCenter(){
  if(selectUser == 0){
    document.getElementById("plus-svg").classList.remove("plus-svg-middle");
  } else {
    document.getElementById("plus-svg").classList.add("plus-svg-middle");
  }
}


/**
 * This Function adds the selected user to the selected users array "selectUser" (from the select user dialog popup function "showUser")
 * 
 * @param {string} i - current selection
 * @returns 
 */
function addUser(i) {
  // All details of selected user i in new array "userInfo" (the selected users)
  let userInfo = users[i];
  //console.log('userInfo', userInfo)
  //name of selected user in dialig box
  let userName = users[i].name;
  // loop to remove users already in the selection when clicked again.
  for (let i = 0; i < selectUser.length; i++) {
    let selection = selectUser[i];
    // if statement compares the user in array all users "users" with user in the selected users array "selectUser" if 
    // user exists then the user will be spliced out of the array..
    if (userName == selection.name) {
      selectUser.splice(i, 1);
      //console.log('removed', selectUser)
      //ticks shown next to selected users
      showCheckUp();
      //console.log("User w??rde schon hinzugef??gt");
      loadImages();     
      return;
    }
  }
  //pushes all details (JSON) for the selected user to array "selectUser" --- 
  //this will be the user array to be added to the task in function "createTaskJSON"
  selectUser.push(userInfo);

  //console.log('selectUser', selectUser);
  loadImages();
  showCheckUp();

}


/**
 * This function compares the users in all users with the users in selected users if they are the in both then 
 * a tick will be placed next to the user in the select user dialog popup --- from function "show user"
 */
function showCheckUp() {
  for (let i = 0; i < users.length; i++) {
    //first for all divs 'checked_0, 1, 2 ... the ticks are removed if present...
    document.getElementById(`checked_${i}`).innerHTML = "";
    const userName = users[i].name;
    for (let j = 0; j < selectUser.length; j++) {
      const selectedUserName = selectUser[j].name;
      if (userName == selectedUserName) {
        document.getElementById(`checked_${i}`).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle svg-check" viewBox="0 0 16 16">
           <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
           <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
           </svg>`;
      } 
    }
  }
}


/**
 * This function closes the adduser popup dialog box
 */
function closeUserDialog() {
  document.getElementById("bg-grey").classList.add("d-none");
  

}

/**
 * This function pushes araray to server via main.js and minibackend.js
 *
 * @param {string} key
 * @param {array} array
 */
function setArray(key, array) {
  backend.setItem(key, JSON.stringify(array));
}






