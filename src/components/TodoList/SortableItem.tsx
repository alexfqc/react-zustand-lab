import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";
import { GREEN_OUTLINE_CLASSES } from "./constants";

export default function SortableItem({
  id,
  children,
  moveTodo,
  index,
}: {
  id: number;
  children: ReactNode;
  index: number;
  moveTodo: (current: number, next: number) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: 50,
    boxShadow: transform ? "0 8px 20px rgba(0,0,0,0.2)" : undefined,
    scale: transform ? 1.05 : 1,
    backgroundColor: "white",
  } as React.CSSProperties;

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`group flex items-center rounded border px-2 py-1 ${GREEN_OUTLINE_CLASSES} cursor-default`}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          moveTodo(index, index + 1);
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          moveTodo(index, index - 1);
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
