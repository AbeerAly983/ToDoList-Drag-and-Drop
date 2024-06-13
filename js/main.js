let taskForm = document.getElementById("add-form");
let taskInput = document.getElementById("add-task");

let toDo = document.getElementById("to-do");
let doing = document.getElementById("doing");
let done = document.getElementById("done");

let toDoList = [];
let doingList = [];
let doneList = [];

if (localStorage.getItem("toDoTasks") != null) {
  toDoList = JSON.parse(localStorage.getItem("toDoTasks"));
  display(toDoList, toDo);
}
if (localStorage.getItem("doingTasks") != null) {
  doingList = JSON.parse(localStorage.getItem("doingTasks"));
  display(doingList, doing);
}

if (localStorage.getItem("doneTasks") != null) {
  doneList = JSON.parse(localStorage.getItem("doneTasks"));
  display(doneList, done);
}

function check() {
  if (taskInput.value == "") {
    document.querySelector(".alert").classList.replace("d-none", "d-block");
  } else {
    document.querySelector(".alert").classList.replace("d-block", "d-none");
  }
}

taskInput.addEventListener("input", check);

taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let newTask = taskInput.value;
  if (newTask == "") {
    check();
  } else {
    toDoList.push(newTask);
    localStorage.setItem("toDoTasks", JSON.stringify(toDoList));
    display(toDoList, toDo);
    taskInput.value = "";
  }
});

function display(arr, parent) {
  parent.innerHTML = "";
  let task;
  for (let i = 0; i < arr.length; i++) {
    task = document.createElement("p");
    task.classList.add("task", "shadow");
    task.setAttribute("draggable", "true");
    task.innerHTML =
      arr[i] +
      `<div class="float-end align-content-center"><i class="fa-solid fa-trash-alt"></i></div>`;
    task.addEventListener("dragstart", function (e) {
      e.target.classList.add("drag");
    });

    task.addEventListener("dragend", function (e) {
      e.target.classList.remove("drag");
      updateLocalStorage();
    });

    task.addEventListener("click", function (e) {
      if (e.target.classList.contains("fa-trash-alt")) {
        let parentTask = e.target.closest(".task");
        parentTask.remove();
        updateLists();
        updateLocalStorage();
      }
    });

    parent.appendChild(task);
  }
}
toDo.addEventListener("dragover", function (e) {
  e.preventDefault();
  let currentTask = document.querySelector(".drag");
  toDo.appendChild(currentTask);
  updateLists();
  updateLocalStorage();
});

doing.addEventListener("dragover", function (e) {
  e.preventDefault();
  let currentTask = document.querySelector(".drag");
  doing.appendChild(currentTask);
  updateLists();
  updateLocalStorage();
});

done.addEventListener("dragover", function (e) {
  e.preventDefault();
  let currentTask = document.querySelector(".drag");
  done.appendChild(currentTask);
  updateLists();
  updateLocalStorage();
});

function updateLocalStorage() {
  toDoList = Array.from(toDo.children).map((task) => task.textContent);
  doingList = Array.from(doing.children).map((task) => task.textContent);
  doneList = Array.from(done.children).map((task) => task.textContent);
  localStorage.setItem("toDoTasks", JSON.stringify(toDoList));
  localStorage.setItem("doingTasks", JSON.stringify(doingList));
  localStorage.setItem("doneTasks", JSON.stringify(doneList));
}

function updateLists() {
  toDoList = Array.from(toDo.children).map((task) => task.textContent);
  doingList = Array.from(doing.children).map((task) => task.textContent);
  doneList = Array.from(done.children).map((task) => task.textContent);
}
