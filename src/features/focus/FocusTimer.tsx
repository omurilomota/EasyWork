import React, { useState, useEffect } from 'react';

type TimerMode = 'focus' | 'short-break' | 'long-break';

const FocusTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<TimerMode>('focus');

  const modes = {
    'focus': 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(modes[newMode]);
    setIsRunning(false);
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(modes[mode]);
    setIsRunning(false);
  };

  return (
    <div className="focus-timer">
      <div className="timer-header">
        <h3>⏱️ Timer Pomodoro</h3>
        <div className="mode-selector">
          {Object.entries(modes).map(([key, value]) => (
            <button
              key={key}
              className={`mode-btn ${mode === key ? 'active' : ''}`}
              onClick={() => handleModeChange(key as TimerMode)}
            >
              {key === 'focus' ? 'Foco' : key === 'short-break' ? 'Pausa' : 'Longa'} ({value / 60}m)
            </button>
          ))}
        </div>
      </div>
      
      <div className="timer-display">
        <div className="time-circle">
          <div className="time-text">{formatTime(timeLeft)}</div>
          <div className="time-label">{mode === 'focus' ? 'Foco' : 'Descanso'}</div>
        </div>
      </div>
      
      <div className="timer-controls">
        <button className="control-btn primary" onClick={handleStartPause}>
          {isRunning ? '⏸️ Pausar' : '▶️ Iniciar'}
        </button>
        <button className="control-btn secondary" onClick={handleReset}>
          ↺ Resetar
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;