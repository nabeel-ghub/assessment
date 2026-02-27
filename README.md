# 📝 Todo Dashboard

A task management system built with [Next.js 16](https://nextjs.org/blog/next-16) (Turbopack), TypeScript, TailwindCSS, and Shadcn UI. This project was developed as a technical assessment to demonstrate proficiency in modern React patterns, state management, and responsive UI design.

## 🛠️ Project Setup

This project was bootstrapped with `create-next-app` and uses `shadcn/ui` for modular component design

### 1. Initialization
```bash
npx create-next-app@latest my-todo-app --typescript --tailwind --eslint
cd my-todo-app
```
### 2. TailwindCSS, Shadcn & Lucide  UI Configuration

The project uses `shadcn/ui` components, `lucide` icons and `Tailwind CSS` for all styling

```bash
npx shadcn@latest init
npm install lucide-react
```
### 3. Component Installation
```bash
npx shadcn@latest add button card input select combobox calendar field popover dropdown-menu label pagination
```

### 4. Running Locally
```bash
npm run dev
```

## 📸 Screen Shots
### Desktop View
A split-pane dashboard with a fixed sidebar for inputs and a scrollable list area.
<p align="center">
  <img src="https://github.com/user-attachments/assets/a9e59e0b-cb84-4662-851f-e27ead331c36" width="800" alt="Dashboard Desktop">
</p>

### Mobile View
Fully responsive stacked layout optimized for mobile viewports using Tailwind's flexbox logic.
<div align="left">
  <img src="https://github.com/user-attachments/assets/7924bbd3-64b5-4974-b0ee-642f4c7fdfa5" width="300" height="550"/>
  <img src="https://github.com/user-attachments/assets/fa541cd8-f1ed-4e40-8b9b-442edc9c5d94" width="300" height="550"/>
</div>

## 💡 Design Decisions

### 1. Advanced Tailwind CSS Patterns
Instead of writing long, repetitive classes, I implemented professional Tailwind strategies:
<ul>
  <li><b>Dynamic Data Attributes:</b> Used <code>data-attributes</code> to handle UI states (e.g., <code>data-[status=done]:opacity-50)</code>. This keeps the JSX clean and the logic separated from the styles.</li>
  <li><b>Custom Scrollbars & Masks:</b> Applied Tailwind utilities to create a "fade-out" effect on the scrollable list using <code>mask-image</code></li>
  <li><b>Dark Mode Strategy:</b> Fully implemented using the <code>dark:</code> variant, ensuring a seamless transition between light and dark themes.</li>
</ul>

### 2. Derived State Over ` useEffect `
I calculated the displayList (filtering and sorting) during render rather than saving it in a separate state.
<ul>
  <li><b>Reasoning:</b> This avoids "state lag" and ensures the UI is always 100% in sync with the search bar, avoiding the "double-render" bug common in React assessments.</li>
</ul>

### 3. Visual Feedback & UX Affordance
Instead of relying only on text, I used a "Visual-First" approach for task management.
<ul>
  <li><b>Decision:</b> I integrated Lucide-React icons and conditional Tailwind styling to create immediate visual cues for task priority and status.</li>
  <li><b>Reasoning:</b> Users should be able to scan their dashboard and understand the state of their tasks in milliseconds. By using specific icon weights and color-coded status badges (via Shadcn), I reduced the "time-to-understand" for the interface.</li>
</ul>

## 📂 Folder Structure

```
├── app/
│   ├── dashboard/           # Main Task Management Feature
│   │   ├── components/      # Dashboard-specific components
│   │   │   ├── AddToDo.tsx
│   │   │   ├── DatePickerPopover.tsx
│   │   │   ├── SearchFilterBar.tsx
│   │   │   ├── StatusDropdown.tsx
│   │   │   ├── TodoCard.tsx
│   │   │   ├── TodoEditForm.tsx
│   │   │   ├── TodoListSection.tsx
│   │   │   └── TodoPagination.tsx
│   │   ├── page.tsx         # Dashboard Route & State Controller
│   │   └── types.ts         # Local TypeScript interfaces
│   ├── login/               # Authentication Feature
│   │   └── page.tsx         
│   ├── globals.css          # Global styles & Tailwind variables
│   ├── layout.tsx           # Root Layout
│   └── page.tsx             # Entry Point (Routing logic)
├── components/              # Shared Shadcn UI library
├── public/                  # Static assets & Screenshots
├── components.json          # Shadcn configuration
└── package.json             # Project dependencies
```
### Key Architectural Decisions:
<ul>
  <li><b>Feature-Based Nesting:</b> I kept dashboard-specific components (like <code>TodoPagination.tsx</code> and <code>TodoCard.tsx</code>) inside the <code>dashboard/</code> folder. This ensures that the code stays modular and easy to find as the project grows.</li>
  <li><b>Separation of Concerns:</b> The <code>page.tsx</code> file acts as the Controller (handling state and logic), while the files in the <code>components/</code> folder are Presentational, focusing purely on the UI.</li>
  <li><b>Scoped Types:</b> Using a local <code>types.ts</code> within the dashboard feature ensures that task-related interfaces are only loaded where they are actually needed.</li>
</ul>

## 📄 License
This project is for assessment purposes.