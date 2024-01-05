/* 
  Document is the DOM can be accessed in the console with document.window.
  Tree is from the top, html, body, p etc.

  Problem: User interaction does not provide the correct results.
  Solution: Add interactivity so the user can manage daily tasks.
  Break things down into smaller steps and take each step at a time.

  Event handling, user interaction is what starts the code execution.
*/

let taskInput = document.querySelector(".input_add");
let addButton = document.querySelector(".button_add");
let incompleteTaskHolder = document.getElementById("incompleted_tasks");
let completedTasksHolder = document.getElementById("completed_tasks");

let createNewTaskElement = function (taskString) {
  let listItem = document.createElement("li");
  let checkBox = document.createElement("input");
  let label = document.createElement("label");
  let editInput = document.createElement("input");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");
  let deleteButtonImg = document.createElement("img");

  listItem.classList.add("li");

  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");

  label.innerText = taskString;
  label.classList.add("label");

  editInput.type = "text";
  editInput.classList.add("input", "input_hidden");

  editButton.innerText = "Edit";
  editButton.classList.add("button", "button_edit");

  deleteButtonImg.classList.add("button__delete-img");
  deleteButtonImg.src = "./remove.svg";

  deleteButton.classList.add("button", "button_delete");
  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);
  return listItem;
};

let addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  let listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

let editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  let listItem = this.parentNode;
  let editInput = listItem.querySelector(".input");
  let label = listItem.querySelector(".label");
  let editBtn = listItem.querySelector(".button_edit");
  let isEditedState = listItem.classList.contains("li_edit");

  /*
    Task can turn into 2 states: edit (has class 'li_edit') or save
    Edited state: input field turns into label (-> saved state)
    Saved state:  label turns into input field (-> edited state)
  */
  if (isEditedState) {
    label.innerText = editInput.value;
    editInput.classList.remove("input_shown");
    label.classList.remove("label_hidden");
    editInput.classList.add("input_hidden");

    editBtn.innerText = "Edit";
    listItem.classList.remove("li_edit");
  } else {
    editInput.value = label.innerText;
    editInput.classList.add("input_shown");
    label.classList.add("label_hidden");

    editBtn.innerText = "Save";
    listItem.classList.add("li_edit");
  }
};

let deleteTask = function () {
  console.log("Delete Task...");

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  ul.removeChild(listItem);
};

let taskCompleted = function () {
  console.log("Complete Task...");

  let listItem = this.parentNode;
  listItem.querySelector(".label").classList.add("label", "label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

let taskIncomplete = function () {
  console.log("Incomplete Task...");

  let listItem = this.parentNode;
  listItem.querySelector(".label").classList.remove("label_completed");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

let ajaxRequest = function () {
  console.log("AJAX Request");
};

/*
  Bind events to lists of completed/incompleted tasks, to buttons 
*/
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

let bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  let checkBox = taskListItem.querySelector(".checkbox");
  let editButton = taskListItem.querySelector(".button_edit");
  let deleteButton = taskListItem.querySelector(".button_delete");

  editButton.addEventListener("click", editTask);
  deleteButton.addEventListener("click", deleteTask);
  checkBox.addEventListener("change", checkBoxEventHandler);
};

for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
