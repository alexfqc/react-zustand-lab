import { useState } from "react";
import { Pencil, Trash, Circle, CircleCheck, ListTodo } from "lucide-react";

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
    setTodos(todos.filter((t) => t.id !== t.id));
  };

  return (
    <div className="mx-auto flex w-[480px] max-w-full flex-col justify-center p-2 md:pt-10">
      <div className="max-w-full rounded border p-4 shadow">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <ListTodo size={28} className="text-green-500" />
          Todo List
        </h1>
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            className="flex-1 rounded border border-gray-300 px-2 py-1 transition-colors duration-300 hover:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
          />
          <button
            className={`${
              newTodo.trim()
                ? "cursor-pointer bg-green-500 transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
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
              className="group flex items-center justify-between rounded border px-2 py-1"
            >
              <div className="flex flex-1 items-center gap-2">
                <span
                  className={`flex-1 ${
                    todo.completed ? "text-gray-400 line-through" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  title={
                    todo.completed ? "Mark as incomplete" : "Mark as complete"
                  }
                  className="hidden transition-colors duration-300 hover:text-green-600 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 active:outline-none group-focus-within:inline group-hover:inline"
                >
                  {todo.completed ? (
                    <Circle size={16} />
                  ) : (
                    <CircleCheck size={16} />
                  )}
                </button>

                <button
                  title="Edit"
                  className="hidden text-sm text-gray-500 transition-colors duration-200 hover:text-green-600 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 active:outline-none group-focus-within:inline group-hover:inline"
                >
                  <Pencil size={16} />
                </button>

                <button
                  className="hidden transition-colors duration-300 hover:text-red-500 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-red-500 active:outline-none group-focus-within:inline group-hover:inline"
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete"
                >
                  <Trash size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
