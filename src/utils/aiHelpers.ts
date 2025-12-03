export class AIAssistant {
  static calculateProductivityScore(tasks: any[]): number {
    const completed = tasks.filter(t => t.completed).length;
    const total = tasks.length;
    const onTime = tasks.filter(t => !t.overdue).length;
    
    if (total === 0) return 0;
    
    const completionRate = (completed / total) * 100;
    const onTimeRate = (onTime / total) * 100;
    
    return Math.round((completionRate * 0.6) + (onTimeRate * 0.4));
  }

  static suggestOptimalWorkTime(history: any[]): { hour: number; confidence: number } {
    const hourProductivity = new Array(24).fill(0);
    
    history.forEach(task => {
      if (task.completedAt) {
        const hour = new Date(task.completedAt).getHours();
        hourProductivity[hour] += task.priority === 'high' ? 2 : 1;
      }
    });
    
    const bestHour = hourProductivity.indexOf(Math.max(...hourProductivity));
    const confidence = Math.min((Math.max(...hourProductivity) / 10) * 100, 95);
    
    return { hour: bestHour, confidence };
  }

  static generateSmartBreakdown(task: any, maxSubtasks = 5): string[] {
    const words = task.title.toLowerCase().split(' ');
    const subtasks: string[] = [];
    
    if (words.includes('relatório') || words.includes('report')) {
      subtasks.push('Coletar dados e estatísticas');
      subtasks.push('Analisar resultados');
      subtasks.push('Escrever introdução');
      subtasks.push('Criar gráficos e visualizações');
      subtasks.push('Revisar e formatar');
    } else if (words.includes('apresentação') || words.includes('presentation')) {
      subtasks.push('Definir estrutura');
      subtasks.push('Criar slides principais');
      subtasks.push('Adicionar conteúdo');
      subtasks.push('Design e formatação');
      subtasks.push('Praticar apresentação');
    } else {
      subtasks.push(`Pesquisar sobre "${task.title}"`);
      subtasks.push(`Planejar abordagem`);
      subtasks.push(`Executar principais ações`);
      subtasks.push(`Revisar resultados`);
      subtasks.push(`Finalizar e documentar`);
    }
    
    return subtasks.slice(0, maxSubtasks);
  }

  static estimateTaskTime(task: any): number {
    const complexity = task.priority === 'high' ? 1.5 : task.priority === 'medium' ? 1 : 0.5;
    const wordCount = task.title.split(' ').length;
    const baseTime = wordCount * 5;
    
    return Math.round(baseTime * complexity);
  }
}

export class GamificationEngine {
  static calculateExperience(achievements: any[], tasksCompleted: number): number {
    const achievementPoints = achievements.reduce((sum, a) => sum + (a.unlocked ? a.points : 0), 0);
    const taskPoints = tasksCompleted * 10;
    
    return achievementPoints + taskPoints;
  }

  static getLevel(experience: number): number {
    return Math.floor(Math.sqrt(experience / 100));
  }

  static getNextLevelExperience(currentLevel: number): number {
    return Math.pow(currentLevel + 1, 2) * 100;
  }
}
