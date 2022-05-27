let form = document.getElementById("form");
let addMessage = document.getElementById("todo-input");
let wrapper = document.querySelector(".todo-items");
const inputCheck = document.getElementById("inputCheck");
const itemsCount = document.getElementById("itemsCount");
const completedSpan = document.getElementById("completedSpan");
const allSpan = document.getElementById("all");
const activeSpan = document.getElementById("activeSpan");
const allCompletedDelete = document.querySelector(".items-clear");
let todoList = [];

//arr for completed task
let todoItemElems = [];

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!addMessage.value.trim()) return;
  let newTodo = {
    text: addMessage.value,
    completed: inputCheck.checked,
  };
  todoList.unshift(newTodo);

  fillHtml();

  addMessage.value = "";
  inputCheck.checked = false;
});

function fillHtml() {
  wrapper.innerHTML = "";
  if (todoList.length > 0) {
    todoList.forEach((item, index) => {
      wrapper.innerHTML += createHtml(item, index);
    });

    todoItemElems = document.querySelectorAll(".todo-item");
  }

  checkLength2();
}
fillHtml();

function createHtml(task, index) {
  return `<div class="todo-item ${task.completed ? "checked" : ""}">
  <div class="check">
      <div class="check-mark">
          <input onclick="completeTask(${index})" type="checkbox" ${
    task.completed ? "checked" : ""
  } />
      </div>

 <div class="todo-text">
      ${todoList[index].text}
  </div>

  </div>

  <button onclick="deleteTask(${index})"><i class="fa-solid fa-x"></i></button>
</div>  `;
}

function completeTask(index) {
  todoList[index].completed = !todoList[index].completed;

  if (todoList[index].completed) {
    allCompletedDelete.classList.add("active");
  } else if (!todoList[index].completed) {
    allCompletedDelete.classList.remove("active");
  }

  if (todoList[index].completed) {
    todoItemElems[index].classList.add("checked");
  } else {
    todoItemElems[index].classList.remove("checked");
  }
  fillHtml();
}

function deleteTask(index) {
  todoItemElems[index].classList.add("delition");
  setTimeout(() => {
    todoList.splice(index, 1);
    fillHtml();
  }, 500);
}

completedSpan.addEventListener("click", function () {
  let b = todoList.filter((a) => a.completed);
  if (b.length == 0) {
    wrapper.innerHTML = `<p style='text-align:center;opacity:.3;padding:15px ';>Bitirdiyin ish yoxdu.Bekarciliqdi?</p>`;
  }
  let displayMes = "";
  for (let i = 0; i < b.length; i++) {
    displayMes += `<div class="todo-item ${"checked"}">
     <div class="check">
         <div class="check-mark">
             <input onclick="completeTask(${i})" type="checkbox" ${"checked"} />
         </div>
          <div class="todo-text">
         ${b[i].text}
     </div>
     </div>
   
     <button onclick="deleteTask(${i})"><i class="fa-solid fa-x"></i></button>
 </div>`;
    wrapper.innerHTML = displayMes;
  }
  activeSpan.classList.remove("active");
  completedSpan.classList.add("active");
});

activeSpan.addEventListener("click", function () {
  let actives = todoList.filter((a) => !a.completed);
  let displayMesag = "";
  for (let i = 0; i < actives.length; i++) {
    displayMesag += `<div class="todo-item ">
     <div class="check">
         <div class="check-mark">
             <input onclick="completeTask(${i})" type="checkbox"  />
         </div>
            <div class="todo-text">
         ${actives[i].text}
     </div>
     </div>
     <button onclick="deleteTask(${i})"><i class="fa-solid fa-x"></i></button>
 </div>`;
    wrapper.innerHTML = displayMesag;
  }
  allSpan.classList.remove("active");
  completedSpan.classList.remove("active");
  activeSpan.classList.add("active");
});

allSpan.addEventListener("click", function () {
  fillHtml();
  activeSpan.classList.remove("active");
  completedSpan.classList.remove("active");
  allSpan.classList.add("active");
});

// function checkLength() {
//   // if (todoList.completed)
//   itemsCount.textContent = todoList.length;

// }

function checkLength2() {
  itemsCount.textContent = todoList.length;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].completed) {
      itemsCount.textContent--;
    }
  }
}

allCompletedDelete.addEventListener("click", function () {
  completeDelete();
  fillHtml();
});

function completeDelete() {
  todoList = todoList.filter((item) => item.completed === false);
}

const themeBtn = document.querySelector(".theme");

// themeBtn.addEventListener("click", function () {
//   const theme = document.documentElement.dataset.theme;
//   if (theme === "light") {
//     document.documentElement.dataset.theme = "dark";
//   } else {
//     document.documentElement.dataset.theme = "light";
//   }
// });

let bgColor = document.querySelector("#bgColor");

function ligthModeOn() {
  console.log('ligthModeOn')
  bgColor.src = "assets/img/bg-desktop-light.jpg";
}
function darkMode() {
  console.log('darkMode')
  bgColor.src = "assets/img/bg-desktop-dark.jpg";
}
// themeBtn.addEventListener("click", transformSunToMoon);
// themeBtn.addEventListener('click',darkMode)

let sun = document.getElementById("sun");

let theme = "light";
function transformSunToMoon() {
  if (theme === "light") {
    sun.src = "assets/img/icon-moon.svg";
    darkMode();
    theme = "dark";
  } else {
    sun.src = "assets/img/icon-sun.svg";
    ligthModeOn();
    theme = "light";
  }
}

let sunMoon = document.getElementById("sun");

sun.addEventListener("click", transformSunToMoon);
// themeBtn.addEventListener('click',transformSunToMoon)
