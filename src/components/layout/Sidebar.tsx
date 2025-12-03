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

  return (
    <aside className="app-sidebar">
      <nav className="sidebar-nav">
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
        
        <div className="nav-section">
          <div className="section-header">
            <h3 className="nav-title">PROJETOS</h3>
            <button 
              className="add-btn"
              onClick={onAddProject}
              aria-label="Adicionar novo projeto"
            >
              +
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