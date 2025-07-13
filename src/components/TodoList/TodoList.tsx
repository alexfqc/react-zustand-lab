import { useState } from "react";
import {
  Pencil,
  Trash,
  Circle,
  CircleCheck,
  CircleX,
  ListTodo,
  Check,
} from "lucide-react";
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
import SortableItem from "./SortableItem";
import TodoInput from "./TodoInput";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number>(0);
  const [editingValue, setEditingValue] = useState("");

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
    setTodos(todos.filter((t) => t.id !== id));
  };

  const startEditing = (id: number, currentValue: string) => {
    setEditingId(id);
    setEditingValue(currentValue);
  };

  const saveEdit = () => {
    if (editingValue.trim() === "") return;
    setTodos(
      todos.map((t) =>
        t.id === editingId ? { ...t, title: editingValue } : t,
      ),
    );
    setEditingId(0);
    setEditingValue("");
  };

  const cancelEdit = () => {
    setEditingId(0);
    setEditingValue("");
  };

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
        <TodoInput
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            <ul className="space-y-2">
              {todos.map((todo) => (
                <SortableItem key={todo.id} id={todo.id}>
                  <div className="flex flex-1 items-center justify-between gap-2">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit();
                          if (e.key === "Escape") cancelEdit();
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
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={() => cancelEdit()}
                            title="Cancel edit"
                            className="transition-colors duration-300 hover:text-red-500 focus:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-red-500 active:outline-none"
                          >
                            <CircleX size={16} />
                          </button>
                          <button
                            onClick={() => saveEdit()}
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
                            title={
                              todo.completed
                                ? "Mark as incomplete"
                                : "Mark as complete"
                            }
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
                </SortableItem>
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
