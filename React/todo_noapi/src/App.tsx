import { useState, useEffect } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) setTodos(JSON.parse(savedTodos));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addOrUpdateTodo = () => {
    if (!input.trim()) return;
    if (editId !== null) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    }
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id: number, text: string) => {
    setInput(text);
    setEditId(id);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">To-Do List</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={addOrUpdateTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            {editId !== null ? "Update" : "Add"}
          </button>
        </div>
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-2 border-b ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <span
                onClick={() => toggleTodo(todo.id)}
                className="cursor-pointer flex-1"
              >
                {todo.text}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => editTodo(todo.id, todo.text)}
                  className="text-yellow-500"
                >
                  ✎
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="text-red-500"
                >
                  ✖
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
