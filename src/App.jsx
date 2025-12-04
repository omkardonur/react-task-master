import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/layout/Header';
import TodoTable from './features/todos/components/TodoTable';
import TodoFilters from './features/todos/components/TodoFilters';
import TodoBoard from './features/todos/components/TodoBoard';
import TodoCalendar from './features/todos/components/TodoCalendar';
import TodoDetailsModal from './features/todos/components/TodoDetailsModal';

const INITIAL_TODOS = [
  { id: 1, text: 'Buy groceries', completed: false, priority: 'medium', dueDate: '', comments: [], attachments: [] },
  { id: 2, text: 'Finish React project', completed: false, priority: 'high', dueDate: new Date().toISOString().split('T')[0], comments: [], attachments: [] },
  { id: 3, text: 'Walk the dog', completed: true, priority: 'low', dueDate: '', comments: [], attachments: [] },
];

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('crud-todos');
    return saved ? JSON.parse(saved) : INITIAL_TODOS;
  });
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('list');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem('crud-todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Supports both (text, priority, date) from inline and (object) from modal
  const handleAdd = (arg1, arg2, arg3) => {
    let newTask = {
      id: Date.now(),
      completed: false,
      status: 'todo',
      comments: [],
      attachments: []
    };

    if (typeof arg1 === 'object') {
      newTask = { ...newTask, ...arg1 };
    } else {
      newTask.text = arg1;
      newTask.priority = arg2;
      newTask.dueDate = arg3;
    }

    setTodos([newTask, ...todos]);
  };

  const handleToggle = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        const newCompleted = !todo.completed;
        return { 
          ...todo, 
          completed: newCompleted,
          status: newCompleted ? 'done' : 'todo'
        };
      }
      return todo;
    }));
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(null);
    }
  };

  const handleUpdate = (id, updatedData) => {
    const updates = typeof updatedData === 'string' ? { text: updatedData } : updatedData;
    
    setTodos(prevTodos => prevTodos.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
    
    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(prev => ({ ...prev, ...updates }));
    }
  };

  const handleUpdateStatus = (id, status) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, status, completed: status === 'done' } : todo
    ));
  };

  const handleAddComment = (id, text) => {
    const newComment = {
      id: Date.now(),
      text,
      timestamp: new Date().toISOString()
    };
    
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, comments: [...(todo.comments || []), newComment] };
      }
      return todo;
    }));

    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(prev => ({
        ...prev,
        comments: [...(prev.comments || []), newComment]
      }));
    }
  };

  const handleAddAttachment = (id, file) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === id) {
        return { ...todo, attachments: [...(todo.attachments || []), file] };
      }
      return todo;
    }));

    if (selectedTodo && selectedTodo.id === id) {
      setSelectedTodo(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), file]
      }));
    }
  };

  const handleSelectTodo = (todo) => {
    setSelectedTodo(todo);
  };

  const handleStartCreate = (initialData = {}) => {
    setSelectedTodo({
      text: '', 
      priority: 'medium', 
      dueDate: '', 
      description: '',
      comments: [],
      attachments: [],
      ...initialData
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="container">
      <Header 
        todoCount={activeCount} 
        totalCount={todos.length}
        toggleTheme={toggleTheme}
        isDarkMode={isDarkMode}
      />

      <div className="card">
        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              className={`filter-btn ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
            >
              List View
            </button>
            <button 
              className={`filter-btn ${view === 'board' ? 'active' : ''}`}
              onClick={() => setView('board')}
            >
              Board View
            </button>
            <button 
              className={`filter-btn ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              Calendar View
            </button>
          </div>
          
          {view !== 'list' && (
            <button className="btn btn-primary" onClick={handleStartCreate}>
              + Add Task
            </button>
          )}
        </div>

        <div style={{ padding: '1rem' }}>
          {view === 'list' && (
            <>
              <TodoTable 
                todos={filteredTodos}
                filter={filter}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={(id) => {
                  const todo = todos.find(t => t.id === id);
                  if (todo) handleSelectTodo(todo);
                }}
                onAdd={handleAdd}
              />
              <TodoFilters 
                currentFilter={filter} 
                onFilterChange={setFilter} 
                show={todos.length > 0} 
              />
            </>
          )}

          {view === 'board' && (
            <TodoBoard 
              todos={todos} 
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
              onUpdate={(id) => {
                const todo = todos.find(t => t.id === id);
                if (todo) handleSelectTodo(todo);
              }}
            />
          )}

          {view === 'calendar' && (
            <TodoCalendar 
              todos={todos}
              onToggle={handleToggle}
              onDelete={handleDelete}
              onUpdate={(id) => {
                 const todo = todos.find(t => t.id === id);
                 if (todo) handleSelectTodo(todo);
              }}
              onAdd={handleStartCreate}
            />
          )}
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        {view === 'board' ? 'Drag and drop tasks to change status' : 'Double-click a task to edit details'}
      </div>

      {selectedTodo && (
        <TodoDetailsModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onUpdate={handleUpdate}
          onAdd={handleAdd}
          onAddComment={handleAddComment}
          onAddAttachment={handleAddAttachment}
        />
      )}
    </div>
  );
}

export default App;
