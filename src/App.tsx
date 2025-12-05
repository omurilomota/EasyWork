import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/layout/Header';
import AISuggestionsImported from './components/ai/AISuggestions';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import './styles/premium.css';
import { Task } from './types';
// Importação direta dos arquivos que existem
import TaskBoard from './components/tasks/TaskBoard';

// Interface para menu e projetos
interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

interface Project {
  id: number;
  name: string;
  color: string;
  tasks: number;
}

interface Suggestion {
  id: number;
  text: string;
  taskId?: number;
  priority?: 'low' | 'medium' | 'high';
}

// Componentes de placeholder enquanto não resolvemos as importações
const FocusTimerPlaceholder: React.FC = () => (
  <div className="focus-timer glass-effect">
    <div className="timer-header">
      <h3>⏱️ Timer Pomodoro</h3>
      <div className="mode-selector">
        <button className="mode-btn active">Foco (25m)</button>
        <button className="mode-btn">Pausa (5m)</button>
        <button className="mode-btn">Longa (15m)</button>
      </div>
    </div>
    <div className="timer-display">
      <div className="time-circle">
        <div className="time-text">25:00</div>
        <div className="time-label">Foco</div>
      </div>
    </div>
    <div className="timer-controls">
      <button className="control-btn primary">▶️ Iniciar</button>
      <button className="control-btn secondary">↺ Resetar</button>
    </div>
  </div>
);

const AchievementSystemPlaceholder: React.FC<{ achievements: any[]; onAchievementClick: (id: number) => void }> = ({ achievements, onAchievementClick }) => (
  <div className="achievement-system glass-effect">
    <h3>🏆 Sistema de Conquistas</h3>
    <div className="level-display">
      <div className="level">Nível 12</div>
      <div className="xp-bar">
        <div className="xp-progress" style={{ width: '75%' }}></div>
      </div>
      <div className="xp-text">1,250/2,000 XP</div>
    </div>
    <div className="achievements-grid">
      {achievements.map(achievement => (
        <div 
          key={achievement.id} 
          className={`achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`}
          onClick={() => onAchievementClick(achievement.id)}
        >
          <div className="achievement-icon">{achievement.icon}</div>
          <div className="achievement-content">
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
            <span className="achievement-points">+{achievement.points} XP</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AISuggestionsPlaceholder: React.FC<{ tasks: Task[]; onAcceptSuggestion?: (suggestion: Suggestion) => void; onDismissSuggestion?: (id: number) => void }> = ({
  tasks = [],
  onAcceptSuggestion,
  onDismissSuggestion
}) => (
  <div className="ai-suggestions glass-effect">
    <div className="ai-header">
      <h3>🤖 Sugestões de IA</h3>
      <span className="ai-badge">INTELIGENTE</span>
    </div>
    <div className="suggestions-list">
      {tasks.slice(0, 3).map(task => (
        <div key={task.id} className="suggestion-item priority-high">
          <div className="suggestion-text">{task.title}</div>
          <div className="suggestion-actions">
            <button
              className="action-btn accept"
              onClick={() =>
                onAcceptSuggestion?.({
                  id: task.id,
                  text: task.description ?? task.title,
                  taskId: task.id,
                })
              }
            >
              ✓ Aceitar
            </button>
            <button className="action-btn dismiss" onClick={() => onDismissSuggestion?.(task.id)}>
              ✕ Ignorar
            </button>
          </div>
        </div>
      ))}
      {tasks.length === 0 && (
        <div className="suggestion-item">
          <div className="suggestion-text">Nenhuma sugestão por enquanto</div>
        </div>
      )}
    </div>
    <div className="ai-stats">
      <div className="stat">
        <span className="stat-value">92%</span>
        <span className="stat-label">Precisão</span>
      </div>
      <div className="stat">
        <span className="stat-value">48</span>
        <span className="stat-label">Sugestões aceitas</span>
      </div>
    </div>
  </div>
);

const StatsOverviewPlaceholder: React.FC = () => (
  <div className="stats-grid">
    <div className="stat-card primary-gradient">
      <div className="stat-header">
        <div className="stat-icon">📊</div>
        <span className="trend positive">+8%</span>
      </div>
      <div className="stat-value">92%</div>
      <div className="stat-label">Taxa de Conclusão</div>
    </div>
    <div className="stat-card success-gradient">
      <div className="stat-header">
        <div className="stat-icon">🔥</div>
        <span className="streak">7 dias</span>
      </div>
      <div className="stat-value">12</div>
      <div className="stat-label">Concluídas Hoje</div>
    </div>
  </div>
);

// Tentar importar dinamicamente os componentes que podem estar em diferentes locais
let FocusTimer = FocusTimerPlaceholder;
let AchievementSystem = AchievementSystemPlaceholder;
let AISuggestions = AISuggestionsImported ?? AISuggestionsPlaceholder;
let StatsOverview = StatsOverviewPlaceholder;

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Primeiros Passos', description: 'Complete sua primeira tarefa', unlocked: true, icon: '🎯', points: 50 },
    { id: 2, title: 'Mestre do Foco', description: 'Complete 10 sessões de foco', unlocked: false, icon: '🎯', points: 100 },
    { id: 3, title: 'Produtivo Nato', description: 'Complete 50 tarefas em uma semana', unlocked: false, icon: '🚀', points: 200 },
    { id: 4, title: 'Concentração Máxima', description: 'Complete 5 sessões de foco em um dia', unlocked: true, icon: '🧠', points: 150 },
    { id: 5, title: 'Colaborador', description: 'Convide 3 amigos para o app', unlocked: false, icon: '🤝', points: 75 },
    { id: 6, title: 'Mestre das Tarefas', description: 'Complete 100 tarefas', unlocked: false, icon: '🏆', points: 300 },
  ]);

  // Dados de projetos
  const [projects, setProjects] = useState<Project[]>([
    { id: 1, name: 'Projeto Alpha', color: '#6366f1', tasks: 12 },
    { id: 2, name: 'Projeto Beta', color: '#8b5cf6', tasks: 8 },
    { id: 3, name: 'Projeto Gamma', color: '#ec4899', tasks: 5 },
    { id: 4, name: 'Desenvolvimento Web', color: '#10b981', tasks: 3 },
    { id: 5, name: 'Marketing Digital', color: '#f59e0b', tasks: 7 },
  ]);

  // Exemplo simples de tarefas que o AISuggestions precisa
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Revisar PR', description: 'Revisar pull request #23', completed: false, projectId: 1, priority: 'high' },
    { id: 2, title: 'Criar testes', description: 'Criar testes para o componente X', completed: false, projectId: 2, priority: 'medium' },
    { id: 3, title: 'Planejar sprint', description: 'Definir backlog para a sprint', completed: false, projectId: 1, priority: 'low' },
  ]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024);
      if (window.innerWidth <= 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setActiveMenuItem(menuItem);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleTaskComplete = () => {
    const randomChance = Math.random();
    if (randomChance > 0.7) {
      const lockedAchievements = achievements.filter(a => !a.unlocked);
      if (lockedAchievements.length > 0) {
        const randomIndex = Math.floor(Math.random() * lockedAchievements.length);
        const achievementToUnlock = lockedAchievements[randomIndex];
        
        setAchievements(prev => prev.map(ach => 
          ach.id === achievementToUnlock.id ? { ...ach, unlocked: true } : ach
        ));
        
        alert(`🎉 Conquista desbloqueada: ${achievementToUnlock.title}`);
      }
    }
  };

  const handleAcceptSuggestion = (suggestion: Suggestion) => {
    console.log('Sugestão aceita:', suggestion);
    // Marcar a tarefa sugerida como concluída (se houver tarefa mapeada)
    if (suggestion.taskId) {
      setTasks(prev => prev.map(t => t.id === suggestion.taskId ? { ...t, completed: true } : t));
    }
  };

  const handleDismissSuggestion = (id: number) => {
    console.log('Sugestão ignorada, id:', id);
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    console.log(`Projeto selecionado: ${project.name}`);
    
    // Fechar sidebar em mobile após selecionar um projeto
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleAddProject = () => {
    const projectName = prompt('Digite o nome do novo projeto:');
    if (projectName) {
      const newProject: Project = {
        id: projects.length + 1,
        name: projectName,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        tasks: 0
      };
      setProjects([...projects, newProject]);
      console.log('Novo projeto adicionado:', newProject);
    }
  };

  const handleAchievementClick = (achievementId: number) => {
    setAchievements(prev => prev.map(ach => 
      ach.id === achievementId ? { ...ach, unlocked: !ach.unlocked } : ach
    ));
  };

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Dashboard':
        return (
          <>
            <motion.div 
              className="welcome-banner gradient-primary"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1>Bem-vindo ao NexusTask Pro Premium! 🚀</h1>
              <p>Sua produtividade está 35% acima da média esta semana</p>
              <div className="banner-actions">
                <button className="banner-btn" onClick={handleTaskComplete}>
                  🎯 Completar Tarefa Aleatória
                </button>
              </div>
            </motion.div>

            <StatsOverview />
            
            <div className="dashboard-grid">
              <FocusTimer />
              
              <motion.div 
                className="stat-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="stat-header">
                  <div className="stat-icon">📊</div>
                  <span className="trend positive">+8%</span>
                </div>
                <div className="stat-value">92%</div>
                <div className="stat-label">Taxa de Conclusão</div>
              </motion.div>

              <motion.div 
                className="stat-card success-gradient"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="stat-header">
                  <div className="stat-icon">⏱️</div>
                  <span className="trend positive">+15%</span>
                </div>
                <div className="stat-value">256m</div>
                <div className="stat-label">Tempo em Foco</div>
              </motion.div>
            </div>

            <div className="content-grid">
              <TaskBoard onTaskComplete={handleTaskComplete} />
              <AISuggestions 
                tasks={tasks}
                onAcceptSuggestion={handleAcceptSuggestion}
                onDismissSuggestion={handleDismissSuggestion}
              />
            </div>

            <AchievementSystem 
              achievements={achievements}
              onAchievementClick={handleAchievementClick}
            />
          </>
        );
      
      case 'Tarefas':
        return (
          <div className="page-content">
            <h1 className="page-title">📋 Gerenciador de Tarefas</h1>
            <TaskBoard onTaskComplete={handleTaskComplete} />
          </div>
        );
      
      case 'Metas':
        return (
          <div className="page-content">
            <h1 className="page-title">🎯 Metas e Objetivos</h1>
            <p className="page-subtitle">Defina e acompanhe suas metas de produtividade</p>
          </div>
        );
      
      case 'Foco':
        return (
          <div className="page-content">
            <h1 className="page-title">⏱️ Sessões de Foco</h1>
            <FocusTimer />
          </div>
        );
      
      case 'Conquistas':
        return (
          <div className="page-content">
            <h1 className="page-title">🏆 Sistema de Conquistas</h1>
            <AchievementSystem 
              achievements={achievements}
              onAchievementClick={handleAchievementClick}
            />
          </div>
        );
      
      default:
        return (
          <div className="page-content">
            <h1 className="page-title">{activeMenuItem}</h1>
            <p className="page-subtitle">Conteúdo em desenvolvimento</p>
          </div>
        );
    }
  };

  return (
    <div className="app-container premium-theme">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme}
        toggleSidebar={handleSidebarToggle}
      />
      
      {isMobile && sidebarOpen && (
        <div 
          className="overlay active"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className="app-content">
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside
              className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Sidebar 
                activeMenuItem={activeMenuItem}
                onMenuItemClick={handleMenuItemClick}
                projects={projects}
                onProjectClick={handleProjectClick}
                onAddProject={handleAddProject}
                selectedProject={selectedProject}
              />
            </motion.aside>
          )}
        </AnimatePresence>

        <main className="main-content">
          {renderContent()}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default App;