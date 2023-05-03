let todoListContainer = document.getElementById("todoListContainer");
let addTodoButtonElement = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getLocalStorageElement() {
  let sprigifiedElement = localStorage.getItem("todoList");
  let parseElement = JSON.parse(sprigifiedElement);
  if (parseElement === null) {
    return [];
  } else {
    return parseElement;
  }
}

let todoList = getLocalStorageElement();
let todolength = todoList.length;

saveTodoButton.onclick = function () {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

function labelElementStatusChange(checkBoxId, labelId, todoId) {
  let checkBoxE1 = document.getElementById(checkBoxId);
  let labelE1 = document.getElementById(labelId);
  labelE1.classList.toggle("checked");

  let TodoObjectIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });
  let TodoObject = todoList[TodoObjectIndex];
  if (TodoObject.isChecked === true) {
    TodoObject.isChecked = false;
  } else {
    TodoObject.isChecked = true;
  }
}

function onTodoItemDelete(todoId) {
  let todoIdE1 = document.getElementById(todoId);
  todoListContainer.removeChild(todoIdE1);

  let deleteTodoIndex = todoList.findIndex(function (eachTodo) {
    let eachTodoId = "todo" + eachTodo.uniqueNo;
    if (eachTodoId === todoId) {
      return true;
    } else {
      return false;
    }
  });

  todoList.splice(deleteTodoIndex, 1);
}

function onTodoCreateItemsElement(todo) {
  let checkBoxId = "checkboxInput" + todo.uniqueNo;
  let labelId = "labelId" + todo.uniqueNo;
  let todoId = "todo" + todo.uniqueNo;

  let listItemsContainer = document.createElement("li");
  listItemsContainer.classList.add("todo-item-container", "d-flex", "flex-row");
  listItemsContainer.id = todoId;
  todoListContainer.appendChild(listItemsContainer);

  let checkBoxElement = document.createElement("input");
  checkBoxElement.type = "checkbox";
  checkBoxElement.id = checkBoxId;
  checkBoxElement.checked = todo.isChecked;
  checkBoxElement.classList.add("checkbox-input");
  checkBoxElement.onclick = function () {
    labelElementStatusChange(checkBoxId, labelId, todoId);
  };
  listItemsContainer.appendChild(checkBoxElement);

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("lebel-container", "d-flex", "flex-row");
  listItemsContainer.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.textContent = todo.text;
  labelElement.classList.add("label-element");
  labelElement.setAttribute("for", checkBoxId);
  labelElement.id = labelId;
  if (todo.isChecked === true) {
    labelElement.classList.add("checked");
  }

  labelContainer.appendChild(labelElement);

  let deleteContainer = document.createElement("div");
  deleteContainer.classList.add("delete-container");
  labelContainer.appendChild(deleteContainer);

  let deleteElement = document.createElement("i");
  deleteElement.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteElement.onclick = function () {
    onTodoItemDelete(todoId);
  };
  deleteContainer.appendChild(deleteElement);
}

function onTodoAddButton() {
  todolength = todolength + 1;

  let userInputE1 = document.getElementById("userInputValue");
  let userInputValue = userInputE1.value;

  if (userInputValue === "") {
    alert("Enter a Valid Text");
    return;
  }

  let newTodo = {
    text: userInputValue,
    uniqueNo: todolength,
    isChecked: false,
  };
  todoList.push(newTodo);
  onTodoCreateItemsElement(newTodo);
  userInputE1.value = "";
}
addTodoButtonElement.onclick = function () {
  onTodoAddButton();
};

for (let eachtodo of todoList) {
  onTodoCreateItemsElement(eachtodo);
}
