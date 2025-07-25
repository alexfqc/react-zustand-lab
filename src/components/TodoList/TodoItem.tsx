import { memo } from "react";
import {
  Circle,
  CircleCheck,
  Pencil,
  Trash,
  CircleX,
  Check,
} from "lucide-react";
import { GREEN_OUTLINE_CLASSES } from "./constants";
import { useTodoStore } from "../../store/useTodoStore";
import { type Todo } from "../../types/todo";

function TodoItem({ todo }: { todo: Todo }) {
  const {
    editingId,
    cancelEdit,
    startEditing,
    setEditingValue,
    saveEdit,
    toggleTodo,
    editingValue,
    deleteTodo,
  } = useTodoStore();
  const isEditing = editingId === todo.id;
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
          aria-label={`Edit input todo: ${todo.title}`}
        />
      ) : (
        <span
          className={`flex-1 truncate ${
            todo.completed ? "text-gray-400 line-through" : ""
          }`}
          aria-label={`Todo title: ${todo.title}${todo.completed ? " completed" : ""}`}
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
              aria-label={`Cancel edit todo: ${todo.title}`}
            >
              <CircleX size={16} />
            </button>
            <button
              onClick={saveEdit}
              title="Save edit"
              className={`text-gray-500 transition-colors duration-200 hover:text-green-600 ${GREEN_OUTLINE_CLASSES}`}
              aria-label={`Confirm edit todo: ${todo.title}`}
            >
              <Check size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => toggleTodo(todo.id)}
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              className={`transition-colors duration-300 hover:text-green-600 ${GREEN_OUTLINE_CLASSES}`}
              aria-pressed={todo.completed}
              aria-label={
                todo.completed
                  ? `Mark todo ${todo.title} as incomplete`
                  : `Mark todo ${todo.title} as complete`
              }
            >
              {todo.completed ? (
                <CircleCheck size={16} />
              ) : (
                <Circle size={16} />
              )}
            </button>
            <button
              onClick={() => startEditing(todo.id, todo.title)}
              title="Edit"
              className={`text-gray-500 transition-colors duration-200 hover:text-green-600 ${GREEN_OUTLINE_CLASSES}`}
              aria-label={`Edit todo: ${todo.title}`}
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              title="Delete"
              className="transition-colors duration-300 hover:text-red-500 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-red-500 active:outline-none"
              aria-label={`Delete todo: ${todo.title}`}
            >
              <Trash size={16} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default memo(TodoItem);
