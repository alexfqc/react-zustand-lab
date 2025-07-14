import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { GREEN_OUTLINE_CLASSES } from "./constants";
import { useTodoStore } from "../../store/useTodoStore";

export default function SortableItem({
  id,
  children,
  index,
}: {
  id: number;
  children: ReactNode;
  index: number;
}) {
  const { reorderTodos } = useTodoStore();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 50,
    boxShadow: transform ? "0 8px 20px rgba(0,0,0,0.2)" : undefined,
    scale: transform ? 1.05 : 1,
    backgroundColor: "white",
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group flex items-center rounded border px-2 py-1 ${GREEN_OUTLINE_CLASSES} cursor-default`}
      onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          reorderTodos(index, index + 1);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          reorderTodos(index, index - 1);
        }
      }}
    >
      <button
        {...listeners}
        className={`cursor-grab text-gray-400 hover:text-gray-600 ${GREEN_OUTLINE_CLASSES}`}
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      {children}
    </li>
  );
}
