import React, { useState } from 'react';

interface Suggestion {
  id: number;
  text: string;
  priority: 'high' | 'medium' | 'low';
}

const AISuggestions: React.FC = () => {
  const [suggestions] = useState<Suggestion[]>([
    { id: 1, text: 'Agendar reunião de equipe para amanhã 10:00', priority: 'high' },
    { id: 2, text: 'Dividir projeto grande em subtarefas menores', priority: 'medium' },
    { id: 3, text: 'Agendar intervalo após 90 minutos de trabalho', priority: 'low' },
  ]);

  const handleAccept = (id: number) => {
    console.log(`Sugestão ${id} aceita`);
  };

  const handleDismiss = (id: number) => {
    console.log(`Sugestão ${id} ignorada`);
  };

  return (
    <div className="ai-suggestions">
      <div className="ai-header">
        <h3>🤖 Sugestões de IA</h3>
        <span className="ai-badge">INTELIGENTE</span>
      </div>
      
      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={`suggestion-item priority-${suggestion.priority}`}>
            <div className="suggestion-text">{suggestion.text}</div>
            <div className="suggestion-actions">
              <button 
                className="action-btn accept"
                onClick={() => handleAccept(suggestion.id)}
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
};

export default AISuggestions;