import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  points: number;
}

interface AchievementSystemProps {
  achievements: Achievement[];
  onAchievementClick: (id: number) => void;
}

const AchievementSystem: React.FC<AchievementSystemProps> = ({ achievements, onAchievementClick }) => {
  const [userXP, setUserXP] = useState(1250);
  const [level, setLevel] = useState(12);
  
  const calculateTotalXP = () => {
    return achievements.reduce((total, ach) => total + (ach.unlocked ? ach.points : 0), 0);
  };

  const calculateProgress = () => {
    const nextLevelXP = (level + 1) * 100;
    return Math.min((userXP / nextLevelXP) * 100, 100);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    if (!achievement.unlocked) {
      if (window.confirm(`Desbloquear conquista "${achievement.title}"?`)) {
        onAchievementClick(achievement.id);
        setUserXP(prev => prev + achievement.points);
        
        // Verificar se subiu de nível
        const newLevel = Math.floor(Math.sqrt((userXP + achievement.points) / 100));
        if (newLevel > level) {
          setLevel(newLevel);
          alert(`🎉 Parabéns! Você subiu para o nível ${newLevel}!`);
        }
      }
    } else {
      alert(`✅ Conquista "${achievement.title}" já desbloqueada!\n${achievement.description}`);
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalPoints = calculateTotalXP();

  return (
    <div className="achievement-system glass-effect">
      <div className="achievement-header">
        <h3>🏆 Sistema de Conquistas</h3>
        <div className="achievement-stats">
          <span className="stat-badge">{unlockedCount}/{achievements.length} Conquistas</span>
          <span className="stat-badge">⭐ {totalPoints} Pontos</span>
        </div>
      </div>
      
      <div className="level-display">
        <div className="level-info">
          <div className="level">Nível {level}</div>
          <div className="xp-text">{userXP} XP</div>
        </div>
        <div className="xp-bar">
          <motion.div 
            className="xp-progress"
            initial={{ width: 0 }}
            animate={{ width: `${calculateProgress()}%` }}
            transition={{ duration: 1 }}
          ></motion.div>
        </div>
        <div className="next-level">
          Próximo nível: {Math.pow(level + 1, 2) * 100} XP
        </div>
      </div>
      
      <div className="achievements-grid">
        {achievements.map((achievement, index) => (
          <motion.div
            key={achievement.id}
            className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAchievementClick(achievement)}
          >
            <div className="achievement-icon">{achievement.icon}</div>
            <div className="achievement-info">
              <h4>{achievement.title}</h4>
              <p>{achievement.description}</p>
              <div className="achievement-points">⭐ {achievement.points} pontos</div>
            </div>
            <div className="achievement-status">
              {achievement.unlocked ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="unlocked-badge"
                >
                  ✅
                </motion.div>
              ) : (
                <div className="locked-badge">
                  🔒<span className="unlock-hint">Clique para desbloquear</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="achievement-actions">
        <button 
          className="btn-primary"
          onClick={() => {
            const locked = achievements.filter(a => !a.unlocked);
            if (locked.length > 0) {
              const randomAchievement = locked[Math.floor(Math.random() * locked.length)];
              onAchievementClick(randomAchievement.id);
              setUserXP(prev => prev + randomAchievement.points);
              alert(`🎉 Conquista "${randomAchievement.title}" desbloqueada aleatoriamente!`);
            } else {
              alert('🎊 Todas as conquistas já foram desbloqueadas!');
            }
          }}
        >
          🎲 Desbloquear Conquista Aleatória
        </button>
      </div>
    </div>
  );
};

export default AchievementSystem;