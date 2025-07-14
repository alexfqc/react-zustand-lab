# 📝 React Zustand Lab

A project which uses the following technologies:

✅ React 18 (Concurrent Features)  
✅ Zustand 4 (state management)  
✅ TypeScript 5 (type safety)  
✅ Tailwind CSS 3 (responsive and stylish design)  
✅ react-router-dom 6 (routing)  
✅ ARIA roles and attributes for accessibility

With a focus on **component architecture, optimizations, and modern best
practices**.

---

## 📦 Tech Stack & Versions

| Package                     | Version  |
| --------------------------- | -------- |
| React                       | 18.x     |
| TypeScript                  | 5.x      |
| Zustand                     | 4.x      |
| Tailwind CSS                | 3.x      |
| react-router-dom            | 6.x      |
| @dnd-kit/core               | ^7.x     |
| @dnd-kit/sortable           | ^7.x     |
| @dnd-kit/modifiers          | ^7.x     |
| lucide-react                | ^0.525.x |
| vitest                      | ^3.x     |
| @testing-library/react      | ^16.x    |
| @testing-library/jest-dom   | ^6.x     |
| @testing-library/user-event | ^14.x    |

---

## ✨ Features

- ✅ **Add, edit, complete, and delete tasks**
- ✅ **Reorder tasks with drag and drop** (mouse or keyboard)
- ✅ **Persist state in localStorage** using Zustand + `middleware/persist`
- ✅ **Initial load with Suspense** and animated fallback using Tailwind
- ✅ **Accessibility enhancements (ARIA roles and attributes, keyboard focus)**
- ✅ **DnD animation support**
- ✅ **Comprehensive unit tests with RTL and Vitest**

---

## ⚠️ Requirements

This project requires **Node.js v22.11.0**.

If you use [nvm](https://github.com/nvm-sh/nvm), run:

```bash
nvm install
nvm use
```

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

- ⚙️ The delay time is configurable via `.env` (create this file in root
  folder):

  ```env
  VITE_REHYDRATE_DELAY=1500
  ```

- In tests, a `.env.test` already in the project file:
  ```env
  VITE_REHYDRATE_DELAY=10
  ```

---

## ♿ Accessibility Highlights

This app was built with **screen reader and keyboard users in mind**:

- 🔹 **List semantics**:
  - `role="list"` on `<ul>`
  - `role="listitem"` on each `<li>`
  - Clear `aria-label`s describing each todo

- 🔹 **Buttons with descriptive labels**:
  - `aria-label="Add a new task"`
  - `aria-label="Delete todo: Buy milk"`

- 🔹 **Loading feedback**:
  - `role="status"`
  - `aria-busy="true"` for screen reader announcement during data rehydration

- 🔹 **Drag and Drop accessibility**:
  - `aria-label="Drag todo: Buy milk"`
  - Keyboard support: reorder todos using ArrowUp / ArrowDown

---

## 🧪 Unit Testing

The project uses Vitest and React Testing Library for unit testing.

✅ Tests implemented

- 📦 Rendering and empty state

- ➕ Adding a todo (button click & Enter key)

- ✏️ Editing a todo (save with Enter or button)

- ❌ Canceling edit (Escape key or button)

- 🗑️ Deleting a todo

- ✅ Marking a todo as completed/incomplete

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
