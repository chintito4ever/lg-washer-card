// Entity helper functions for interacting with Home Assistant entities
export class EntityHelpers {

  static getAttribute(hass, entityId, attribute, defaultValue) {
    const entity = hass.states[entityId];
    if (entity && entity.attributes && entity.attributes[attribute] !== undefined) {
      return entity.attributes[attribute];
    }
    return defaultValue;
  }
  
  static getEntityValue(hass, entityId, defaultValue) {
    const entity = hass.states[entityId];
    if (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') {
      return entity.state;
    }
    return defaultValue;
  }

  static getBinaryState(hass, entityId) {
    const entity = hass.states[entityId];
    if (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') {
      return entity.state === 'on' ? 'On' : 'Off';
    }
    return 'Off';
  }

  static getSwitchState(hass, entityId) {
    const entity = hass.states[entityId];
    if (entity && entity.state !== 'unavailable' && entity.state !== 'unknown') {
      return entity.state === 'on' ? 'On' : 'Off';
    }
    return 'Off';
  }

  static getAllSensorData(hass, deviceName) {
    const baseSensorId = `sensor.${deviceName}`;

    const getWithFallbacks = (primaryEntityId, attributeName, defaultValue = 'Unknown') => {
      const entityValue = this.getEntityValue(hass, primaryEntityId, null);
      if (entityValue !== null) {
        return entityValue;
      }
      return this.getAttribute(hass, baseSensorId, attributeName, defaultValue);
    };

    const getBinaryWithFallbacks = (primaryEntityId, attributeName) => {
      const entityValue = this.getBinaryState(hass, primaryEntityId);
      if (entityValue !== 'Off') {
        return entityValue;
      }
      const attributeValue = this.getAttribute(hass, baseSensorId, attributeName, 'Off');
      return attributeValue === true || attributeValue === 'on' || attributeValue === 'On' ? 'On' : 'Off';
    };

    return {
      machineState: getWithFallbacks(`sensor.${deviceName}_run_state`, 'run_state'),
      previousState: getWithFallbacks(`sensor.${deviceName}_pre_state`, 'pre_state', 'None'),
      currentCourse: getWithFallbacks(`sensor.${deviceName}_current_course`, 'current_course'),
      spinSpeed: getWithFallbacks(`sensor.${deviceName}_spin_speed`, 'spin_speed'),
      waterTemp: getWithFallbacks(`sensor.${deviceName}_water_temp`, 'water_temp'),
      dryLevel: getWithFallbacks(`sensor.${deviceName}_dry_level`, 'dry_level'),
      tubCleanCount: getWithFallbacks(`sensor.${deviceName}_tubclean_count`, 'tubclean_count', '0'),
      remainTime: getWithFallbacks(`sensor.${deviceName}_remain_time`, 'remain_time'),
      initialTime: getWithFallbacks(`sensor.${deviceName}_initial_time`, 'initial_time'),
      reserveTime: getWithFallbacks(`sensor.${deviceName}_reserve_time`, 'reserve_time'),
      completionTime: getWithFallbacks(`sensor.${deviceName}_completion_time`, 'completion_time', ''),
      doorLock: getBinaryWithFallbacks(`binary_sensor.${deviceName}_door_lock`, 'door_lock'),
      childLock: getBinaryWithFallbacks(`binary_sensor.${deviceName}_child_lock`, 'child_lock'),
      remoteStart: getBinaryWithFallbacks(`binary_sensor.${deviceName}_remote_start`, 'remote_start'),
      steam: getBinaryWithFallbacks(`binary_sensor.${deviceName}_steam`, 'steam'),
      preWash: getBinaryWithFallbacks(`binary_sensor.${deviceName}_pre_wash`, 'pre_wash'),
      turboWash: getBinaryWithFallbacks(`binary_sensor.${deviceName}_turbo_wash`, 'turbo_wash'),
      runCompleted: getBinaryWithFallbacks(`binary_sensor.${deviceName}_run_completed`, 'run_completed'),
      errorState: getBinaryWithFallbacks(`binary_sensor.${deviceName}_error_state`, 'error_state'),
      errorMessage: getWithFallbacks(`sensor.${deviceName}_error_message`, 'error_message', 'None')
    };
  }
}
