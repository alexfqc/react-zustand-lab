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
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">📝 Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 border rounded px-2 py-1"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
        />
        <button
          className={`${newTodo.trim() ? 'bg-green-500 cursor-pointer hover:bg-green-600 transition-colors duration-300' : 'bg-green-300 cursor-default'} text-white px-3 py-1 rounded`}
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
            className="flex justify-between items-center border px-2 py-1 rounded"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""}`}
            >
              {todo.title}
            </span>
            <button
              className="text-red-500 hover:text-red-700 transition-colors duration-300"
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
