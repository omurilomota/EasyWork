import React, { useState, useEffect } from 'react';
import { Task, HistoryItem } from '../types';
import { AIAssistant } from '../../lib/ai/aiHelpers';


interface Suggestion {
  id: number;
  text: string;
  type: 'schedule' | 'breakdown' | 'priority' | 'workflow';
  priority: 'low' | 'medium' | 'high';
  data?: any;
}



interface AISuggestionsProps {
  tasks: Task[]; // Use o tipo importado
  onAcceptSuggestion?: (suggestion: Suggestion) => void;
  onDismissSuggestion?: (id: number) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ 
  tasks, 
  onAcceptSuggestion, 
  onDismissSuggestion 
}) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [stats, setStats] = useState({ accuracy: 92, accepted: 48 });

  useEffect(() => {
    generateSuggestions();
  }, [tasks]);

  const generateSuggestions = () => {
    const newSuggestions: Suggestion[] = [];
    
    // Analisar tarefas para gerar sugestões inteligentes
    const incompleteTasks = tasks.filter(t => !t.completed);
    const highPriorityTasks = incompleteTasks.filter(t => t.priority === 'high');
    const overdueTasks = incompleteTasks.filter(t => 
      t.dueDate && new Date(t.dueDate) < new Date()
    );

    // Sugestão 1: Agrupar tarefas relacionadas
    if (incompleteTasks.length >= 3) {
      const relatedTasks = incompleteTasks.filter(t => 
        t.title.toLowerCase().includes('reunião') || 
        t.title.toLowerCase().includes('relatório')
      );
      
      if (relatedTasks.length >= 2) {
        newSuggestions.push({
          id: 1,
          text: `Agrupar ${relatedTasks.length} tarefas relacionadas para execução em bloco`,
          type: 'workflow',
          priority: 'medium',
          data: { taskIds: relatedTasks.map(t => t.id) }
        });
      }
    }

    // Sugestão 2: Tarefas de alta prioridade
    if (highPriorityTasks.length > 0) {
      const optimalTime = AIAssistant.suggestOptimalWorkTime(
      tasks.filter(t => t.completedAt) as HistoryItem[]
);
      newSuggestions.push({
        id: 2,
        text: `Focar em ${highPriorityTasks.length} tarefas de alta prioridade hoje às ${optimalTime.hour}:00`,
        type: 'priority',
        priority: 'high',
        data: { optimalHour: optimalTime.hour }
      });
    }

    // Sugestão 3: Tarefas atrasadas
    if (overdueTasks.length > 0) {
      newSuggestions.push({
        id: 3,
        text: `Você tem ${overdueTasks.length} tarefas atrasadas que precisam de atenção`,
        type: 'schedule',
        priority: 'high',
        data: { overdueTasks: overdueTasks.length }
      });
    }

    // Sugestão 4: Breakdown de tarefas complexas
    const complexTasks = incompleteTasks.filter(t => 
      t.title.split(' ').length > 5 && t.priority === 'high'
    );
    
    if (complexTasks.length > 0) {
      const task = complexTasks[0];
      const subtasks = AIAssistant.generateSmartBreakdown(task);
      newSuggestions.push({
        id: 4,
        text: `Dividir "${task.title.substring(0, 30)}..." em ${subtasks.length} subtarefas`,
        type: 'breakdown',
        priority: 'medium',
        data: { taskId: task.id, subtasks }
      });
    }

    // Garantir pelo menos 1 sugestão
    if (newSuggestions.length === 0) {
      newSuggestions.push({
        id: 5,
        text: 'Parabéns! Suas tarefas estão bem organizadas. Continue assim!',
        type: 'workflow',
        priority: 'low'
      });
    }

    setSuggestions(newSuggestions.slice(0, 3)); // Limitar a 3 sugestões
  };

  const handleAccept = (suggestion: Suggestion) => {
    setStats(prev => ({ ...prev, accepted: prev.accepted + 1 }));
    
    // Implementar lógica específica para cada tipo de sugestão
    switch (suggestion.type) {
      case 'breakdown':
        console.log('Dividindo tarefa em subtarefas:', suggestion.data);
        break;
      case 'schedule':
        console.log('Reagendando tarefas atrasadas');
        break;
      case 'priority':
        console.log('Agendando foco em tarefas prioritárias');
        break;
      case 'workflow':
        console.log('Otimizando fluxo de trabalho');
        break;
    }
    
    if (onAcceptSuggestion) {
      onAcceptSuggestion(suggestion);
    }
    
    // Remover sugestão aceita
    setSuggestions(prev => prev.filter(s => s.id !== suggestion.id));
  };

  const handleDismiss = (id: number) => {
    if (onDismissSuggestion) {
      onDismissSuggestion(id);
    }
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'schedule': return '📅';
      case 'breakdown': return '🔨';
      case 'priority': return '🎯';
      case 'workflow': return '⚡';
      default: return '💡';
    }
  };

  return (
    <div className="ai-suggestions glass-effect">
      <div className="ai-header">
        <h3>🤖 Sugestões de IA</h3>
        <span className="ai-badge">INTELIGENTE</span>
      </div>
      
      <div className="suggestions-list">
        {suggestions.map(suggestion => (
          <div 
            key={suggestion.id} 
            className={`suggestion-item ${getPriorityClass(suggestion.priority)}`}
          >
            <div className="suggestion-type">{getTypeIcon(suggestion.type)}</div>
            <div className="suggestion-text">{suggestion.text}</div>
            <div className="suggestion-actions">
              <button 
                className="action-btn accept"
                onClick={() => handleAccept(suggestion)}
              >
                ✓ Aceitar
              </button>
              <button 
                className="action-btn dismiss"
                onClick={() => handleDismiss(suggestion.id)}
              >
                ✕ Ignorar
              </button>
            </div>
          </div>
        ))}
        
        {suggestions.length === 0 && (
          <div className="no-suggestions">
            <p>🎉 Todas as sugestões foram processadas!</p>
            <button 
              className="action-btn refresh"
              onClick={generateSuggestions}
            >
              🔄 Gerar novas sugestões
            </button>
          </div>
        )}
      </div>
      
      <div className="ai-stats">
        <div className="stat">
          <span className="stat-value">{stats.accuracy}%</span>
          <span className="stat-label">Precisão</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.accepted}</span>
          <span className="stat-label">Sugestões aceitas</span>
        </div>
        <div className="stat">
          <span className="stat-value">{tasks.filter(t => !t.completed).length}</span>
          <span className="stat-label">Tarefas pendentes</span>
        </div>
      </div>
    </div>
  );
};

export default AISuggestions;