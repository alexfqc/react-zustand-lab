import {
  Circle,
  CircleCheck,
  Pencil,
  Trash,
  CircleX,
  Check,
} from "lucide-react";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  editingValue: string;
  setEditingValue: (value: string) => void;
  startEditing: (id: number, value: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
};

export default function TodoItem({
  todo,
  isEditing,
  editingValue,
  setEditingValue,
  startEditing,
  saveEdit,
  cancelEdit,
  toggleTodo,
  deleteTodo,
}: TodoItemProps) {
  return (
    <div className="flex flex-1 cursor-default items-center justify-between gap-2">
      {isEditing ? (
        <input
          type="text"
          value={editingValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEditingValue(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              saveEdit();
            } else if (e.key === "Escape") {
              cancelEdit();
            }
          }}
          autoFocus
          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      ) : (
        <span
          className={`flex-1 truncate ${
            todo.completed ? "text-gray-400 line-through" : ""
          }`}
        >
          {todo.title}
        </span>
      )}

      <div className="flex shrink-0 items-center gap-2">
        {isEditing ? (
          <>
            <button
              onClick={cancelEdit}
              title="Cancel edit"
              className="transition-colors duration-300 hover:text-red-500 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-red-500 active:outline-none"
            >
              <CircleX size={16} />
            </button>
            <button
              onClick={saveEdit}
              title="Save edit"
              className="text-gray-500 transition-colors duration-200 hover:text-green-600 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 active:outline-none"
            >
              <Check size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleTodo(todo.id)}
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              className="transition-colors duration-300 hover:text-green-600 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 active:outline-none"
            >
              {todo.completed ? (
                <Circle size={16} />
              ) : (
                <CircleCheck size={16} />
              )}
            </button>
            <button
              onClick={() => startEditing(todo.id, todo.title)}
              title="Edit"
              className="text-gray-500 transition-colors duration-200 hover:text-green-600 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-green-500 active:outline-none"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              title="Delete"
              className="transition-colors duration-300 hover:text-red-500 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-red-500 active:outline-none"
            >
              <Trash size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
