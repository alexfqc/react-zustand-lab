import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import SortableItem from "./SortableItem";
import TodoItem from "./TodoItem";
import { useTodoStore } from "../../store/useTodoStore";
import { type Todo } from "../../types/todo";

export default function TodoDnD() {
  const { todos, setTodos, hydrated } = useTodoStore();

  if (!hydrated) {
    throw Promise.resolve();
  }

  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = todos.findIndex((t) => t.id === active.id);
      const newIndex = todos.findIndex((t) => t.id === over?.id);
      setTodos(arrayMove(todos, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(event: DragEndEvent) => {
        handleDragEnd(event);
        setIsDragging(false);
      }}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        <ul
          className={`space-y-2 rounded border p-2 transition-colors duration-300 ${
            isDragging
              ? "border-2 border-dashed border-green-400 bg-green-50"
              : "border-transparent"
          }`}
          role="list"
          aria-label="Todo list"
        >
          {todos.map((todo: Todo, index: number) => (
            <SortableItem
              key={todo.id}
              id={todo.id}
              index={index}
              title={todo.title}
            >
              <TodoItem todo={todo} />
            </SortableItem>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
