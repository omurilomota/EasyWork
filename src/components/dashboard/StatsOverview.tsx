import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Stats {
  productivity: number;
  streak: number;
  completedToday: number;
  focusTime: number;
  weeklyGoal: number;
  tasksByPriority: { high: number; medium: number; low: number };
}

const StatsOverview: React.FC = () => {
  const [stats] = useState<Stats>({
    productivity: 85,
    streak: 7,
    completedToday: 12,
    focusTime: 142,
    weeklyGoal: 75,
    tasksByPriority: { high: 3, medium: 8, low: 5 }
  });

  return (
    <div className="stats-grid">
      <motion.div className="stat-card primary-gradient">
        <div className="stat-header">
          <div className="stat-icon">🎯</div>
          <span className="trend positive">+12%</span>
        </div>
        <div className="stat-value">{stats.productivity}%</div>
        <div className="stat-label">Produtividade</div>
      </motion.div>

      <motion.div className="stat-card success-gradient">
        <div className="stat-header">
          <div className="stat-icon">🔥</div>
          <span className="streak">{stats.streak} dias</span>
        </div>
        <div className="stat-value">{stats.completedToday}</div>
        <div className="stat-label">Concluídas Hoje</div>
      </motion.div>
    </div>
  );
};

export default StatsOverview;