/* 
	Document is the DOM can be accessed in the console with document.window.
	Tree is from the top, html, body, p etc.

	Problem: User interaction does not provide the correct results.
	Solution: Add interactivity so the user can manage daily tasks.
	Break things down into smaller steps and take each step at a time.

	Event handling, user interaction is what starts the code execution.
*/

var taskInput = document.querySelector(".input_add");
var addButton = document.querySelector(".button_add");
var incompleteTaskHolder = document.getElementById("incompleted_tasks");
var completedTasksHolder = document.getElementById("completed_tasks");

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement("li");
  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");
  var deleteButtonImg = document.createElement("img");

  listItem.classList.add("li");

  checkBox.type = "checkbox";
  checkBox.classList.add("checkbox");

  label.innerText = taskString;
  label.classList.add("label");

  editInput.type = "text";
  editInput.classList.add("input", "input_hidden");

  editButton.innerText = "Edit";
  editButton.classList.add("button", "button_edit");

  deleteButton.classList.add("button", "button_delete");

  deleteButtonImg.classList.add("button__delete_img");
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function () {
  console.log("Add Task...");

  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = "";
};

var editTask = function () {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector(".input");
  var label = listItem.querySelector(".label");
  var editBtn = listItem.querySelector(".button_edit");
  var isEditedState = listItem.classList.contains("li_edit");

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

var deleteTask = function () {
  console.log("Delete Task...");

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  console.log("Complete Task...");

  var listItem = this.parentNode;
  listItem.querySelector(".label").classList.add("label", "label_completed");
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log("Incomplete Task...");

  var listItem = this.parentNode;
  listItem.querySelector(".label").classList.remove("label_completed");
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var ajaxRequest = function () {
  console.log("AJAX Request");
};

/*
	Bind events to lists of completed/incompleted tasks, to buttons 
*/
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");

  var checkBox = taskListItem.querySelector(".checkbox");
  var editButton = taskListItem.querySelector(".button_edit");
  var deleteButton = taskListItem.querySelector(".button_delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
