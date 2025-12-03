import { useState, useEffect } from 'react';

interface Metrics {
  focusTime: number;
  completedTasks: number;
  productivityScore: number;
  streak: number;
}

export const useProductivity = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    focusTime: 0,
    completedTasks: 0,
    productivityScore: 0,
    streak: 0,
  });

  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        focusTime: prev.focusTime + 1,
        productivityScore: Math.min(100, prev.productivityScore + 0.5),
      }));

      if (Math.random() > 0.7) {
        const newInsights = [
          'Você está 25% mais produtivo que ontem!',
          'Horário de pico: 14:00 - 16:00',
          'Sugestão: Fazer pausas a cada 90 minutos',
          'Tarefas de alta prioridade: 3 pendentes',
        ];
        const randomInsight = newInsights[Math.floor(Math.random() * newInsights.length)];
        setInsights(prev => [...prev, randomInsight].slice(-3)); // Mantém apenas 3 insights
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const completeTask = () => {
    setMetrics(prev => ({
      ...prev,
      completedTasks: prev.completedTasks + 1,
      streak: prev.streak + 1,
    }));
  };

  const resetStreak = () => {
    setMetrics(prev => ({ ...prev, streak: 0 }));
  };

  return {
    metrics,
    insights,
    completeTask,
    resetStreak,
  };
};