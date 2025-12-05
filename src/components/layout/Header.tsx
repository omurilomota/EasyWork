import React from 'react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  toggleSidebar: () => void; // Função para alternar a sidebar
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, toggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        {/* Botão do menu com ID e classe específica para estilização */}
        <button
          id="menu-toggle"
          className="icon-btn menu-btn"
          onClick={toggleSidebar}
          aria-label="Alternar menu"
        >
          <span className="icon-menu">☰</span>
        </button>

        <div className="logo">
          <span className="logo-icon">🚀</span>
          <h1>NexusTask <span className="logo-highlight">Pro</span></h1>
        </div>
      </div>

      <div className="header-center">
        <div className="search-bar">
          <input type="text" placeholder=" Buscar tarefas, projetos..." />
        </div>
      </div>

      <div className="header-right">
        <button
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Alternar para tema escuro' : 'Alternar para tema claro'}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        {/* Botão de notificação com badge */}
        <button
          className="icon-btn"
          aria-label="Notificações"
        >
          🔔
          <span className="notification-badge">3</span> {/* Número de notificações */}
        </button>
        <button
          className="icon-btn"
          aria-label="Perfil do usuário"
        >
          👤
        </button>
      </div>
    </header>
  );
};

export default Header;