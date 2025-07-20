import { useTodoStore } from "../../store/useTodoStore";

export default function TodoInput() {
  const { addTodo, setInputText, inputText, hydrated } = useTodoStore();
  return (
    <div className="mb-4 flex gap-2">
      <input
        type="text"
        className="flex-1 rounded border border-gray-300 px-2 py-1 transition-colors duration-300 hover:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-500"
        value={inputText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputText(e.target.value)
        }
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" && inputText.trim() !== "") {
            addTodo();
          }
        }}
        placeholder="Add a new task..."
        aria-label="Add task input"
        aria-disabled={!hydrated}
        aria-invalid={inputText.trim() === ""}
        disabled={!hydrated}
      />
      <button
        className={`${
          inputText.trim()
            ? "cursor-pointer bg-green-500 transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
            : "cursor-default bg-green-300"
        } rounded px-3 py-1 text-white`}
        onClick={addTodo}
        disabled={!hydrated || !inputText.trim()}
        aria-disabled={!hydrated || !inputText.trim()}
        aria-label="Add task button"
        type="button"
      >
        Add
      </button>
    </div>
  );
}
