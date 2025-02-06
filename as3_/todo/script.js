document.addEventListener("DOMContentLoaded", getTodos);
const apiUrl = "https://jsonplaceholder.typicode.com/todos";

async function getTodos() {
  try {
    const response = await axios.get(apiUrl);
    const todos = response.data.slice(0, 5);
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
    todos.forEach((todo) => displayTodo(todo));
  } catch (error) {
    console.error("err fetching todos", error);
  }
}

function displayTodo(todo) {
  const todoList = document.getElementById("todoList");
  const li = document.createElement("li");
  li.setAttribute("data-id", todo.id);
  li.innerHTML = `
        <span contenteditable="true" onblur="editTodo(${todo.id}, this)">${todo.title}</span>
        <button onclick="deleteTodo(${todo.id})">Delete</button>
    `;
  todoList.appendChild(li);
}

async function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const newTodo = { title: todoInput.value, completed: false };
  try {
    const response = await axios.post(apiUrl, newTodo);
    displayTodo(response.data);
    todoInput.value = "";
  } catch (error) {
    console.error("rror adding todo", error);
  }
}

async function editTodo(id, element) {
  try {
    await axios.put(`${apiUrl}/${id}`, {
      title: element.innerText,
      completed: false,
    });
    console.log("todo updated");
  } catch (error) {
    console.error("err editing todo", error);
  }
}

async function deleteTodo(id) {
  try {
    await axios.delete(`${apiUrl}/${id}`);
    document.querySelector(`li[data-id='${id}']`).remove();
    console.log("todo deleted");
  } catch (error) {
    console.error("err deleting todo", error);
  }
}
