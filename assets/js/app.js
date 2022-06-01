const addMessage = document.getElementById("todo-input");
const form = document.getElementById("form");
const wrapper = document.querySelector(".todo-items");
let inputCheck = document.getElementById("inputCheck");
let itemsCount = document.getElementById("itemsCount");

const allSpan = document.getElementById("all");
let todoList = [];
const itemStatuses = document.querySelector(".items-statuses");
const activeSpan = document.querySelector(".active");
const completedSpan = document.querySelector(".completed");
const itemsClear = document.querySelector(".items-clear");
const itemsLeft = document.querySelector(".items-left");
itemsCount.textContent = 0;

form.addEventListener("submit", addTodo);
wrapper.addEventListener("click", deleteCheck);
allSpan.addEventListener("click", filterAllTodo);
activeSpan.addEventListener("click", filterActiveTodo);
completedSpan.addEventListener("click", filterCompletedSpan);

itemsClear.addEventListener("click", clearCompleted);

function addTodo(event) {
  event.preventDefault();
  if (!addMessage.value.trim()) return;

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo-item");
  if (inputCheck.checked) {
    todoDiv.classList.add("checked");
    itemsCount.textContent--;
  }

  const todoCheckDiv = document.createElement("div");
  todoCheckDiv.classList.add("check");
  todoDiv.appendChild(todoCheckDiv);

  const todoCheckMarkDiv = document.createElement("div");
  todoCheckMarkDiv.classList.add("check-mark");
  todoCheckDiv.appendChild(todoCheckMarkDiv);

  const checkCompleteInp = document.createElement("input");
  checkCompleteInp.classList.add("complete-btn");
  checkCompleteInp.type = "checkbox";
  checkCompleteInp.checked = inputCheck.checked;

  todoCheckMarkDiv.appendChild(checkCompleteInp);

  const todoTextDiv = document.createElement("div");
  todoTextDiv.classList.add("todo-text");
  todoTextDiv.innerHTML = addMessage.value;
  todoCheckDiv.appendChild(todoTextDiv);

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash");
  trashBtn.innerHTML = "X";
  todoDiv.appendChild(trashBtn);

  wrapper.appendChild(todoDiv);

  todoList.push(todoDiv);

  addMessage.value = "";

  inputCheck.checked = "";
  itemsLeft.classList.add("important");
  itemsCount.textContent++;
}

function deleteCheck(event) {
  if (event.target.classList[0] === "trash") {
    event.target.parentElement.classList.add("delition");
    setTimeout(() => {
      event.target.parentElement.remove();
    }, 500);

    itemsCount.textContent--;
  }
  if (itemsCount.textContent <= 0) {
    itemsCount.textContent = "0";
    itemsLeft.classList.remove("important");
  }

  if (event.target.matches('input[type="checkbox"]')) {
    const todoItem = event.target.closest(".todo-item");
    todoItem.classList.toggle("checked");

    if (todoItem.classList.contains("checked")) {
      itemsCount.textContent--;
      itemsClear.classList.add("important");
    } else if (!todoItem.classList.contains("checked")) {
      itemsCount.textContent++;
      itemsClear.classList.remove("important");
    }
  }
}

function filterAllTodo() {
  const todos = wrapper.childNodes;

  todos.forEach(function (item) {
    item.style.display = "flex";
  });
  allSpan.classList.add("important");
  activeSpan.classList.remove("important");
  completedSpan.classList.remove("important");
}

function filterActiveTodo() {
  const todos = wrapper.childNodes;

  todos.forEach(function (item) {
    if (!item.classList.contains("checked")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
  allSpan.classList.remove("important");
  activeSpan.classList.add("important");
}

function filterCompletedSpan() {
  const todos = wrapper.childNodes;

  todos.forEach(function (item) {
    if (item.classList.contains("checked")) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
  allSpan.classList.remove("important");
  activeSpan.classList.remove("important");
  completedSpan.classList.add("important");
}

function clearCompleted() {
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].classList.contains("checked")) {
      todoList[i].classList.add("delition");
      setTimeout(() => {
        todoList[i].remove();
      }, 500);
    }
  }
}

let sun = document.getElementById("sun");
let bgColor = document.getElementById("bgColor");
let theme = "light";

function lightModeOn() {
  bgColor.src = "assets/img/bg-desktop-light.jpg";
}

function darkModeOn() {
  bgColor.src = "assets/img/bg-desktop-dark.jpg";
}

function transformSunToMoon() {
  if (theme === "light") {
    sun.src = "assets/img/icon-moon.svg";
    darkModeOn();
    theme = "dark";
  } else {
    sun.src = "assets/img/icon-sun.svg";
    lightModeOn();
    theme = "light";
  }
}

sun.addEventListener("click", transformSunToMoon);
