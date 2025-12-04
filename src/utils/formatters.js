// Formatter utility functions
export class Formatters {
  
  static formatDeviceName(deviceName) {
    // Convert device name to a nice display format
    return deviceName
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  static formatCompletionTime(timeStr) {
    if (timeStr === 'Unknown' || timeStr === 'unavailable') {
      return 'Unknown';
    }
    
    try {
      const date = new Date(timeStr);
      const now = new Date();
      const diffMs = date.getTime() - now.getTime();
      
      if (diffMs < 0) {
        const pastDiffMs = Math.abs(diffMs);
        const hours = Math.floor(pastDiffMs / (1000 * 60 * 60));
        const minutes = Math.floor((pastDiffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
          return `${hours}h ${minutes}m ago`;
        } else {
          return `${minutes}m ago`;
        }
      } else {
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        if (hours > 0) {
          return `${hours}h ${minutes}m left`;
        } else {
          return `${minutes}m left`;
        }
      }
    } catch (error) {
      return timeStr;
    }
  }

  static formatDuration(timeStr) {
    if (!timeStr || timeStr === 'Unknown' || timeStr === 'unavailable') {
      return 'Unknown';
    }

    // LG reports time as H:MM
    const [hoursStr, minutesStr] = timeStr.split(':');
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return timeStr;
    }

    const hourLabel = hours > 0 ? `${hours}h ` : '';
    const minuteLabel = `${minutes}m`;
    return `${hourLabel}${minuteLabel}`.trim();
  }

  static getIconHtml(icon) {
    // Determine if it's an MDI icon or emoji
    return icon.includes(':') 
      ? `<ha-icon icon="${icon}"></ha-icon>`
      : icon;
  }

  static getStatusClass(machineState) {
    const normalizedState = machineState.toLowerCase();

    if (normalizedState.includes('run') || normalizedState.includes('wash') || normalizedState.includes('spin')) {
      return 'status-running';
    } else if (normalizedState.includes('stopped') || normalizedState.includes('off')) {
      return 'status-stopped';
    } else if (normalizedState.includes('complete')) {
      return 'status-completed';
    } else {
      return 'status-idle';
    }
  }

  static getAnimationClass(machineState, isRecentlyCompleted) {
    const normalizedState = machineState.toLowerCase();
    if (normalizedState.includes('running') || normalizedState.includes('wash') || normalizedState.includes('spin')) {
      return 'running';
    } else if (isRecentlyCompleted) {
      return 'completed';
    } else {
      return '';
    }
  }

  static getStatusLightClass(machineState, isRecentlyCompleted) {
    const normalizedState = machineState.toLowerCase();
    if (normalizedState.includes('running') || normalizedState.includes('wash') || normalizedState.includes('spin')) {
      return 'running';
    } else if (isRecentlyCompleted) {
      return 'completed';
    } else {
      return 'idle';
    }
  }
}
