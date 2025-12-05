import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Task } from '../types'; // Importe o tipo

interface TaskBoardProps {
  onTaskComplete?: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ onTaskComplete }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Revisar relatório trimestral', status: 'todo', priority: 'high', description: 'Analisar dados do último trimestre' },
    { id: 2, title: 'Preparar apresentação', status: 'in-progress', priority: 'medium', description: 'Criar slides para reunião' },
    { id: 3, title: 'Enviar emails de follow-up', status: 'done', priority: 'low', description: 'Contatar clientes' },
    { id: 4, title: 'Atualizar documentação', status: 'todo', priority: 'medium', description: 'Documentar novas funcionalidades' },
    { id: 5, title: 'Reunião com equipe', status: 'todo', priority: 'high', description: 'Planejamento do próximo sprint' },
  ]);

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');

  const handleTaskStatusChange = (taskId: number, newStatus: Task['status']) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));

    if (newStatus === 'done' && onTaskComplete) {
      onTaskComplete();
    }
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        title: newTaskTitle,
        status: 'todo',
        priority: newTaskPriority,
        description: 'Nova tarefa adicionada'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowNewTaskForm(false);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
    }
  };

  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="task-board glass-effect">
      <div className="board-header">
        <div className="header-left">
          <h2>📋 Quadro de Tarefas</h2>
          <div className="task-stats">
            <span className="stat">{tasks.length} tarefas</span>
            <span className="stat">{doneTasks.length} concluídas</span>
          </div>
        </div>
        <div className="board-actions">
          <button 
            className="btn-primary"
            onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          >
            {showNewTaskForm ? 'Cancelar' : '+ Nova Tarefa'}
          </button>
          <button className="btn-secondary">Filtrar</button>
          <button className="btn-secondary">Ordenar</button>
        </div>
      </div>

      {showNewTaskForm && (
        <motion.div 
          className="new-task-form"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <input
            type="text"
            placeholder="Título da tarefa"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="task-input"
          />
          <div className="priority-selector">
            {(['high', 'medium', 'low'] as const).map(priority => (
              <label key={priority} className="priority-option">
                <input
                  type="radio"
                  name="priority"
                  value={priority}
                  checked={newTaskPriority === priority}
                  onChange={() => setNewTaskPriority(priority)}
                />
                <span className={`priority-dot ${priority}`}></span>
                {priority === 'high' ? 'Alta' : priority === 'medium' ? 'Média' : 'Baixa'}
              </label>
            ))}
          </div>
          <button 
            className="btn-primary"
            onClick={handleAddTask}
            disabled={!newTaskTitle.trim()}
          >
            Adicionar Tarefa
          </button>
        </motion.div>
      )}
      
      <div className="board-columns">
        <div className="column">
          <div className="column-header">
            <h3>📝 A Fazer ({todoTasks.length})</h3>
            <div className="column-actions">
              <button className="column-btn" onClick={() => {
                if (todoTasks.length > 0) {
                  const randomTask = todoTasks[Math.floor(Math.random() * todoTasks.length)];
                  handleTaskStatusChange(randomTask.id, 'in-progress');
                }
              }}>
                ▶️ Mover Aleatório
              </button>
            </div>
          </div>
          {todoTasks.map(task => (
            <motion.div 
              key={task.id} 
              className={`task-card priority-${task.priority}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="task-header">
                <span 
                  className="priority-dot" 
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <h4>{task.title}</h4>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-actions">
                <button onClick={() => handleTaskStatusChange(task.id, 'in-progress')}>
                  ▶️ 
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="column">
          <div className="column-header">
            <h3>⚙️ Em Progresso ({inProgressTasks.length})</h3>
          </div>
          {inProgressTasks.map(task => (
            <motion.div 
              key={task.id} 
              className={`task-card priority-${task.priority}`}
              layout
            >
              <div className="task-header">
                <span 
                  className="priority-dot" 
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <h4>{task.title}</h4>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-actions">
                <button onClick={() => handleTaskStatusChange(task.id, 'done')}>
                  ✅ 
                </button>
                <button onClick={() => handleTaskStatusChange(task.id, 'todo')}>
                  ↩️ 
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="column">
          <div className="column-header">
            <h3>✅ Concluído ({doneTasks.length})</h3>
            <div className="column-actions">
              {doneTasks.length > 0 && (
                <button 
                  className="column-btn danger"
                  onClick={() => {
                    if (window.confirm('Limpar todas as tarefas concluídas?')) {
                      setTasks(prev => prev.filter(t => t.status !== 'done'));
                    }
                  }}
                >
                  🗑️ Limpar Tudo
                </button>
              )}
            </div>
          </div>
          {doneTasks.map(task => (
            <motion.div 
              key={task.id} 
              className={`task-card priority-${task.priority} completed`}
              layout
            >
              <div className="task-header">
                <span 
                  className="priority-dot" 
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                ></span>
                <h4>{task.title}</h4>
              </div>
              {task.description && (
                <p className="task-description">{task.description}</p>
              )}
              <div className="task-actions">
                <button onClick={() => handleTaskStatusChange(task.id, 'in-progress')}>
                  ↩️
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>🗑️</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskBoard;