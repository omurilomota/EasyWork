import React from 'react';

interface MenuItem {
  icon: string;
  label: string;
}

interface Project {
  id: number;
  name: string;
  color: string;
  tasks: number;
}

interface Shortcut {
  icon: string;
  label: string;
  action: () => void;
}

interface SidebarProps {
  activeMenuItem: string;
  onMenuItemClick: (label: string) => void;
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onAddProject: () => void;
  selectedProject: Project | null;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeMenuItem,
  onMenuItemClick,
  projects,
  onProjectClick,
  onAddProject,
  selectedProject
}) => {
  const menuItems: MenuItem[] = [
    { icon: '📊', label: 'Dashboard' },
    { icon: '📋', label: 'Tarefas' },
    { icon: '🎯', label: 'Metas' },
    { icon: '⏱️', label: 'Foco' },
    { icon: '📈', label: 'Analytics' },
    { icon: '🏆', label: 'Conquistas' },
    { icon: '⚙️', label: 'Configurações' },
  ];

  // Definição dos atalhos rápidos
  const shortcuts: Shortcut[] = [
    {
      icon: '➕',
      label: 'Nova Tarefa',
      action: () => console.log('Abrir formulário de nova tarefa') // Exemplo de ação
    },
    {
      icon: '⚙️',
      label: 'Configurações',
      action: () => console.log('Ir para configurações') // Exemplo de ação
    },
    {
      icon: '📊',
      label: 'Estatísticas',
      action: () => console.log('Ir para estatísticas') // Exemplo de ação
    },
  ];

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
        {/* Seção de navegação principal */}
        <div className="nav-section">
          <h3 className="nav-title">MENU</h3>
          <ul className="nav-list">
            {menuItems.map((item, index) => (
              <li
                key={`${item.label}-${index}`}
                className={`nav-item ${activeMenuItem === item.label ? 'active' : ''}`}
                onClick={() => onMenuItemClick(item.label)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onMenuItemClick(item.label)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {activeMenuItem === item.label && <div className="active-indicator"></div>}
              </li>
            ))}
          </ul>
        </div>

        {/* Seção de Projetos */}
        <div className="nav-section">
          <div className="section-header">
            <h3 className="nav-title">PROJETOS</h3>
            <button
              className="add-btn"
              onClick={onAddProject}
              aria-label="Adicionar novo projeto"
            >
              
            </button>
          </div>
          <ul className="project-list">
            {projects.map((project) => (
              <li
                key={`${project.id}`}
                className={`project-item ${selectedProject?.id === project.id ? 'selected' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => onProjectClick(project)}
                onKeyDown={(e) => e.key === 'Enter' && onProjectClick(project)}
              >
                <div
                  className="project-color"
                  style={{ backgroundColor: project.color }}
                  aria-label={`Cor do projeto ${project.name}`}
                ></div>
                <span className="project-name">{project.name}</span>
                <span className="project-count">{project.tasks}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Nova Seção: Atalhos Rápidos */}
        <div className="shortcuts-section">
          <h3 className="shortcuts-title">Atalhos Rápidos</h3>
          <ul className="shortcuts-list">
            {shortcuts.map((shortcut, index) => (
              <li
                key={`shortcut-${index}`}
                className="shortcut-item"
                onClick={shortcut.action}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && shortcut.action()}
              >
                <span className="shortcut-icon">{shortcut.icon}</span>
                <span className="shortcut-label">{shortcut.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rodapé da Sidebar com informações do usuário */}
        <div className="sidebar-footer">
          <div className="user-card">
            <div className="user-avatar" role="img" aria-label="Avatar do usuário">
              👨‍💻
            </div>
            <div className="user-info">
              <div className="user-name">Usuário Premium</div>
              <div className="user-status">
                <span className="status-dot online"></span>
                Online
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;