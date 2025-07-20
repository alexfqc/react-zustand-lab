import { lazy } from "react";
import { useTodoStore } from "../../store/useTodoStore";

const TodoDnDContent = lazy(() => import("./TodoDnDContent"));

export default function TodoDnD() {
  const { todos, hydrated } = useTodoStore();

  if (!hydrated) {
    throw Promise.resolve();
  }
  if (todos.length === 0) {
    return (
      <li className="rounded border border-dashed border-gray-300 p-2 text-center text-gray-400">
        {"No todos yet \u2013 add one!"}
      </li>
    );
  }

  return <TodoDnDContent />;
}
