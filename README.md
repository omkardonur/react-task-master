# React Task Master

A professional, feature-rich Todo List application built with React and Vite. This application offers multiple views (List, Board, Calendar) to help you organize your tasks effectively.

## 🚀 Features

- **Multiple Views**:
  - 📋 **List View**: Standard task list with filtering (All, Active, Completed).
  - 📊 **Board View**: Kanban-style board (To Do, In Progress, Done) with drag-and-drop support.
  - 📅 **Calendar View**: Monthly grid view to see tasks by due date.
- **Task Management**:
  - Priority Levels (High, Medium, Low) with color-coded badges.
  - Due Dates.
  - Detailed view with Description/Notes.
  - **Comments**: Add timestamped comments to tasks.
  - **Attachments**: Upload and view files associated with tasks.
- **User Experience**:
  - 🌓 **Dark Mode**: Toggle between Light and Dark themes.
  - 📈 **Progress Bar**: Visual indicator of task completion.
  - ✨ **Animations**: Smooth transitions and delete animations.
- **Persistence**: Data is saved locally in your browser (LocalStorage).

## 🛠️ Tech Stack

- **Frontend**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 (Variables, Grid, Flexbox)
- **Containerization**: Docker

## 🏁 Getting Started

Follow these steps to get the project running on your local machine.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/react-task-master.git
    cd react-task-master
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to view the app.

    > **Note:** To access the app from another device on the same network, run `npm run dev -- --host` (already configured in package.json).

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` folder.

## 🐳 Running with Docker

You can also run the application in a Docker container using the included multi-stage Dockerfile.

1.  **Build the Docker image:**
    ```bash
    docker build -t react-crud .
    ```

2.  **Run the container:**
    ```bash
    docker run -p 8080:80 react-crud
    ```

3.  **Access the app:**
    Open `http://localhost:8080` in your browser.

## 📂 Project Structure

The project follows a scalable feature-based architecture:

```
src/
├── components/           # Shared/Common UI components
│   └── layout/           # Layout components (Header, etc.)
├── features/             # Feature-specific modules
│   └── todos/            # Todo module
│       └── components/   # Components specific to Todos (Form, List, Board, etc.)
├── App.jsx               # Main application container
├── App.css               # Global styles and themes
└── main.jsx              # Entry point
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
