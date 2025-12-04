// Controls section component HTML generator
export function createControlsSection(controlsData) {
  const {
    childLock,
    doorLock,
    remoteStart,
    steam,
    preWash,
    turboWash,
    runCompleted
  } = controlsData;

  return `
    <details class="controls-section">
      <summary class="controls-summary">
        <div class="controls-title">Configuration & Controls</div>
        <div class="controls-chevron">▸</div>
      </summary>

      <div class="controls-grid">
        <div class="control-item">
          <span class="control-label">🔒 Child Lock</span>
          <span class="control-value">${childLock}</span>
        </div>

        <div class="control-item">
          <span class="control-label">🚪 Door Lock</span>
          <span class="control-value">${doorLock}</span>
        </div>

        <div class="control-item">
          <span class="control-label">📱 Remote Start</span>
          <span class="control-value">${remoteStart}</span>
        </div>

        <div class="control-item">
          <span class="control-label">💨 Steam</span>
          <span class="control-value">${steam}</span>
        </div>

        <div class="control-item">
          <span class="control-label">🧺 Pre-Wash</span>
          <span class="control-value">${preWash}</span>
        </div>

        <div class="control-item">
          <span class="control-label">⚡ Turbo Wash</span>
          <span class="control-value">${turboWash}</span>
        </div>

        <div class="control-item">
          <span class="control-label">✅ Run Completed</span>
          <span class="control-value">${runCompleted}</span>
        </div>
      </div>
    </details>
  `;
}
