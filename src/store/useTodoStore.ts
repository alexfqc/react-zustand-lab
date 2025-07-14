import { create } from "zustand";

type TodoState = {
  editingId: number;
  setEditingId: (id: number) => void;
};

export const useTodoStore = create<TodoState>((set) => ({
  editingId: 0,
  setEditingId: (editingId) => set(() => ({ editingId })),
}));
