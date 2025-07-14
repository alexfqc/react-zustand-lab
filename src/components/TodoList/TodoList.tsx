import { useState } from "react";
import { ListTodo } from "lucide-react";
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
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";
import { useTodoStore } from "../../store/useTodoStore";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const { todos, setTodos } = useTodoStore();
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
    <div className="mx-auto flex w-[480px] max-w-full flex-col justify-center p-2 md:pt-10">
      <div className="max-w-full rounded border p-4 shadow">
        <h1 className="mb-4 flex items-center gap-2 text-2xl font-bold">
          <ListTodo size={28} className="text-green-500" />
          Todo List
        </h1>
        <TodoInput />
        {todos.length === 0 ? (
          <li className="rounded border border-dashed border-gray-300 p-2 text-center text-gray-400">
            {"No todos yet \u2013 add one!"}
          </li>
        ) : null}
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
            >
              {todos.map((todo: Todo, index: number) => (
                <SortableItem key={todo.id} id={todo.id} index={index}>
                  <TodoItem todo={todo} />
                </SortableItem>
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
