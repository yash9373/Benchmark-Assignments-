function addTodo() {
  const inputField = document.getElementById("input-todo");
  const text = inputField.value.trim(); // Get value & remove extra spaces
  if (text === "") return; // Prevent adding empty tasks

  const ultodo = document.getElementById("ul-todo");
  const newTask = document.createElement("li");
  newTask.className =
    "list-group-item d-flex justify-content-between align-items-start";
  newTask.innerHTML = `
      <span class="text-todo">${text}</span>
      <button type="button" class="btn btn-success">Edit</button>
      <button type="button" class="btn btn-danger">Delete</button>
    `;

  const editbtn = newTask.querySelector(".btn-success");
  const deletebtn = newTask.querySelector(".btn-danger");

  editbtn.addEventListener("click", () => {
    const currentText = newTask.querySelector(".text-todo").textContent;
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.className = "form-control";
    inputEdit.value = currentText;

    newTask.innerHTML = "";
    newTask.appendChild(inputEdit);

    // Add save button
    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-primary";
    saveBtn.textContent = "Save";
    newTask.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      newTask.innerHTML = `
          <span class="text-todo">${inputEdit.value}</span>
          <button type="button" class="btn btn-success">Edit</button>
          <button type="button" class="btn btn-danger">Delete</button>
        `;
      addEventListeners(newTask);
    });
  });

  deletebtn.addEventListener("click", () => {
    ultodo.removeChild(newTask);
  });

  ultodo.appendChild(newTask);
  inputField.value = ""; // Clear input field after adding
}

function addEventListeners(task) {
  const editbtn = task.querySelector(".btn-success");
  const deletebtn = task.querySelector(".btn-danger");

  editbtn.addEventListener("click", () => {
    const currentText = task.querySelector(".text-todo").textContent;
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.className = "form-control";
    inputEdit.value = currentText;

    task.innerHTML = "";
    task.appendChild(inputEdit);

    const saveBtn = document.createElement("button");
    saveBtn.className = "btn btn-primary";
    saveBtn.textContent = "Save";
    task.appendChild(saveBtn);

    saveBtn.addEventListener("click", () => {
      task.innerHTML = `
          <span class="text-todo">${inputEdit.value}</span>
          <button type="button" class="btn btn-success">Edit</button>
          <button type="button" class="btn btn-danger">Delete</button>
        `;
      addEventListeners(task);
    });
  });

  deletebtn.addEventListener("click", () => {
    task.parentNode.removeChild(task);
  });
}
const ctd = document.getElementById("delete-all-btn");

ctd.addEventListener("click", () => {
  const dltAll = document.querySelectorAll("li"); // Selects all <li> elements
  dltAll.forEach((item) => item.remove()); // Loop through and remove each one
});

const add = document.getElementById("button-todo");
add.addEventListener("click", addTodo);
