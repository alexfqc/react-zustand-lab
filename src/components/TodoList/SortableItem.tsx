import { type ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical } from "lucide-react";

export default function SortableItem({
  id,
  children,
}: {
  id: number;
  children: ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="group flex items-center rounded border px-2 py-1"
    >
      <button
        {...listeners}
        className="cursor-grab text-gray-400 hover:text-gray-600"
        title="Drag to reorder"
      >
        <GripVertical size={16} />
      </button>
      {children}
    </li>
  );
}
