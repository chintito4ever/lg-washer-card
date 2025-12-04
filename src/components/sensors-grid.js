// Sensors grid component HTML generator
export function createSensorsGrid(sensorData) {
  const {
    remainingTime,
    initialTime,
    reserveTime,
    currentCourse,
    previousState,
    spinSpeed,
    waterTemp,
    dryLevel,
    tubCleanCount,
    errorState,
    errorMessage
  } = sensorData;

  const errorDetails = errorState === 'On' && errorMessage !== 'None'
    ? `<div class="sensor-subtext">${errorMessage}</div>`
    : '';

  const glanceItems = [
    { icon: '⏳', label: 'Remaining', value: remainingTime },
    { icon: '⚙️', label: 'Cycle', value: currentCourse },
    { icon: '🌪️', label: 'Spin', value: spinSpeed },
    { icon: '🌡️', label: 'Temp', value: waterTemp },
  ];

  const glanceRow = `
    <div class="glance-row">
      ${glanceItems.map(item => `
        <div class="glance-chip">
          <div class="glance-icon">${item.icon}</div>
          <div class="glance-label">${item.label}</div>
          <div class="glance-value">${item.value}</div>
        </div>
      `).join('')}
    </div>
  `;

  return `
    ${glanceRow}
    <div class="sensors-grid">
      <div class="sensor-card">
        <div class="sensor-icon">🕒</div>
        <div class="sensor-label">Initial Time</div>
        <div class="sensor-value">${initialTime}</div>
      </div>

      <div class="sensor-card">
        <div class="sensor-icon">⌛</div>
        <div class="sensor-label">Delay Start</div>
        <div class="sensor-value">${reserveTime}</div>
      </div>

      <div class="sensor-card">
        <div class="sensor-icon">👁️</div>
        <div class="sensor-label">Previous State</div>
        <div class="sensor-value">${previousState}</div>
      </div>

      <div class="sensor-card">
        <div class="sensor-icon">🔥</div>
        <div class="sensor-label">Dry Level</div>
        <div class="sensor-value">${dryLevel}</div>
      </div>

      <div class="sensor-card">
        <div class="sensor-icon">🧼</div>
        <div class="sensor-label">Cycles Since Tub Clean</div>
        <div class="sensor-value">${tubCleanCount}</div>
      </div>

      <div class="sensor-card">
        <div class="sensor-icon">🚨</div>
        <div class="sensor-label">Error State</div>
        <div class="sensor-value">${errorState}</div>
        ${errorDetails}
      </div>
    </div>
  `;
}
