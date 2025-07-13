import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([todo, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded border p-4 shadow">
      <h1 className="mb-4 text-2xl font-bold">📝 Todo List</h1>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          className="flex-1 rounded border px-2 py-1"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className={`${
            newTodo.trim()
              ? "cursor-pointer bg-green-500 transition-colors duration-300 hover:bg-green-600"
              : "cursor-default bg-green-300"
          } rounded px-3 py-1 text-white`}
          onClick={addTodo}
          disabled={!newTodo.trim()}
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between rounded border px-2 py-1"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? "text-gray-400 line-through" : ""}`}
            >
              {todo.title}
            </span>
            <button
              className="text-red-500 transition-colors duration-300 hover:text-red-700"
              onClick={() => deleteTodo(todo.id)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
