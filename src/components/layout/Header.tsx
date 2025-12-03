import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          ☰
        </button>
        <div className="logo">
          <span className="logo-icon">🚀</span>
          <h1>NexusTask <span className="logo-highlight">Pro</span></h1>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder="🔍 Buscar tarefas, projetos..." />
        </div>
      </div>
      
      <div className="header-right">
        <button className="icon-btn" onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <button className="icon-btn">🔔<span className="notification-badge">3</span></button>
        <button className="icon-btn">👤</button>
      </div>
    </header>
  );
};

export default Header;
