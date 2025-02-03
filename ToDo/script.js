document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAllBtn = document.getElementById("delete-all-btn");

  let editMode = false;
  let editElement = null;

  // Function to Create a Todo Item
  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `
        <span class="text-todo">${task}</span>
        <div class="btn-group" role="group">
          <button type="button" class="btn btn-danger btn-edit">Edit</button>
          <button type="button" class="btn btn-warning btn-delete">Delete</button>
        </div>`;

    ulTodo.appendChild(li);
  };

  // Function to Add or Update a Task
  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value.trim();
    if (text === "") return;

    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodos();
  });

  // Function to Handle Task Actions (Edit & Delete)
  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-delete")) {
      e.target.closest(".list-group-item").remove();
      saveAllTodos();
    }

    if (e.target.classList.contains("btn-edit")) {
      const li = e.target.closest(".list-group-item");
      const taskText = li.querySelector(".text-todo").textContent;

      inputTodo.value = taskText;
      buttonTodo.textContent = "Update";

      editElement = li;
      editMode = true;
    }
  });

  // Function to Delete All Tasks with Confirmation
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all tasks?")) {
      ulTodo.innerHTML = "";
      saveAllTodos();
    }
  });

  // Function to Save Todos to Local Storage
  const saveAllTodos = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  // Function to Load Todos from Local Storage
  const loadAllTodos = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  // Load Todos when Page Loads
  loadAllTodos();
});
