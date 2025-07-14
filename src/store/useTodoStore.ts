import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoState = {
  todos: Todo[];
  editingId: number;
  editingValue: string;
  inputText: string;
  addTodo: () => void;
  setTodos: (todos: Todo[]) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  setEditingId: (id: number) => void;
  setEditingValue: (value: string) => void;
  startEditing: (id: number, value: string) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setInputText: (text: string) => void;
  reorderTodos: (fromIndex: number, toIndex: number) => void;
};

export const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      todos: [],
      editingId: 0,
      editingValue: "",
      inputText: "",

      addTodo: () => {
        set((state) => {
          const newTodo: Todo = {
            id: Date.now(),
            title: state.inputText,
            completed: false,
          };
          return { todos: [...state.todos, newTodo], inputText: "" };
        });
      },

      setTodos: (todos) => set(() => ({ todos })),

      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo,
          ),
        }));
      },

      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },

      setEditingId: (editingId) => set(() => ({ editingId })),

      startEditing: (id, value) =>
        set(() => ({ editingId: id, editingValue: value })),

      setEditingValue: (value) => set(() => ({ editingValue: value })),

      saveEdit: () =>
        set((state) => {
          if (state.editingValue.trim() === "") {
            return { editingId: 0, editingValue: "" };
          }
          return {
            todos: state.todos.map((todo) =>
              todo.id === state.editingId
                ? { ...todo, title: state.editingValue }
                : todo,
            ),
            editingId: 0,
            editingValue: "",
          };
        }),

      cancelEdit: () =>
        set(() => ({
          editingId: 0,
          editingValue: "",
        })),

      setInputText: (text) => set(() => ({ inputText: text })),

      reorderTodos: (fromIndex, toIndex) =>
        set((state) => {
          const todos = [...state.todos];
          const [movedTodo] = todos.splice(fromIndex, 1);

          if (!movedTodo) {
            return { todos };
          }
          todos.splice(toIndex, 0, movedTodo);
          return { todos };
        }),
    }),
    {
      name: "todos-storage",
      partialize: (state) => ({
        todos: state.todos,
      }),
    },
  ),
);
