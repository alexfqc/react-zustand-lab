# 📝 React Zustand Lab

A technical project created as part of an assessment to demonstrate proficiency
in:

✅ React 18 (Concurrent Features)  
✅ Zustand 4 (state management)  
✅ TypeScript 5 (type safety)  
✅ Tailwind CSS 3 (responsive and stylish design)  
✅ react-router-dom 6 (routing)

With a focus on **component architecture, optimizations, and modern best
practices**.

---

## 📦 Tech Stack & Versions

| Package            | Version  |
| ------------------ | -------- |
| React              | 18.x     |
| TypeScript         | 5.x      |
| Zustand            | 4.x      |
| Tailwind CSS       | 3.x      |
| react-router-dom   | 6.x      |
| @dnd-kit/core      | ^7.x     |
| @dnd-kit/sortable  | ^7.x     |
| @dnd-kit/modifiers | ^7.x     |
| lucide-react       | ^0.525.x |

---

## ✨ Features

- ✅ **Add, edit, complete, and delete tasks**
- ✅ **Reorder tasks with drag and drop** (mouse or keyboard)
- ✅ **Persist state in localStorage** using Zustand + `middleware/persist`
- ✅ **Initial load with Suspense** and animated fallback using Tailwind
- ✅ **Accessibility (keyboard focus, ARIA roles)**
- ✅ **DnD animation support**

---

## 🧠 Technical Decisions

### 🟢 Global State with Zustand

- All state (todos, input, editing) is centralized in Zustand.

### 🟢 Persistence

- Used Zustand’s `persist` middleware.
- Only essential state (`todos`) is saved to localStorage.
- UI state (like editing mode) is not persisted.

### 🟢 Suspense and Mock Delay

- To meet the requirement of using Suspense and React 18 Concurrent Features:
  - Used Zustand’s `onRehydrateStorage` to simulate a 1.5s delay.
  - While rehydrating, the app displays a `<Loading />` fallback with
    `Suspense`.

---

## 🖱️ Drag and Drop

- Implemented with @dnd-kit (core, sortable, modifiers).
- Restrictions:
  - Dragging is vertical-only
  - Restricted to the container
- Supports keyboard reordering with **ArrowUp/ArrowDown**

---

## 🎨 UI & Design

- Responsive UI with Tailwind CSS 3
- Smooth animations for hover, focus, and drag actions
- Compact loading fallback

---

## 📝 Scripts

```bash
# Start the development server
npm run dev

# Lint and format code
npm run lint
npm run format

# Build for production
npm run build
```
