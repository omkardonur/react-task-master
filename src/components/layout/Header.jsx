import React from 'react';

function Header({ todoCount, totalCount, toggleTheme, isDarkMode }) {
  const progress = totalCount > 0 ? ((totalCount - todoCount) / totalCount) * 100 : 0;

  return (
    <header className="header">
      <div className="header-top">
        <div>
          <h1>Task Master</h1>
          <div style={{ color: 'var(--text-secondary)' }}>
            {todoCount} tasks remaining
          </div>
        </div>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      
      {totalCount > 0 && (
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </header>
  );
}

export default Header;
