# Samsung/LG Washer Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/custom-components/hacs)
[![GitHub release (latest by date)](https://img.shields.io/github/v/release/raulpetruta/samsung-ha-washer-card)](https://github.com/raulpetruta/samsung-ha-washer-card)

A beautiful, animated Home Assistant card for Samsung washing machines with SmartThings integration, now updated to work great with LG washers too.

## Features

🎨 **Modern Design**
- Beautiful appliance-inspired color scheme
- Automatic light/dark mode support
- Smooth animations and hover effects

🔄 **Animated Washing Machine**
- Color-coded status light (Aqua/Green/Amber)

📊 **Rich Information Display**
- Live time remaining, delay start, and initial time
- Current cycle details (course, previous state, spin, temperature, dry level)
- Tub clean counter and error details
- Configuration and control status

⚙️ **Highly Configurable**
- Custom device names
- Configurable icons (emoji or MDI)
- Adjustable completion status duration

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant
2. Go to "Frontend" section
3. Click "Explore & Download Repositories"
4. Search for "Samsung Washer Card"
5. Download and install
6. Restart Home Assistant

### Manual Installation

1. Download `samsung-washer-card.js` from the [latest release](https://github.com/raulpetruta/samsung-ha-washer-card)
2. Copy to `/config/www/samsung-washer-card/samsung-washer-card.js`
3. Add to your Lovelace resources:

```yaml
resources:
  - url: /local/samsung-washer-card/samsung-washer-card.js
    type: module
```

## Configuration

### Visual Editor (Recommended)

The card now includes a visual configuration editor! Simply:

1. Add the card to your dashboard
2. Click "Configure" or the edit button
3. Use the visual interface to set all options including:
   - Device name and icon
   - Grid layout options for full width control
   - Status display duration

### Get the device_name

Under Controls, click on the first option
![Get device_name step 1](screenshots/setup-1.png)

Your device_name will be "X" (what's after the "select.")
![Get device_name step 2](screenshots/setup-2.png)

### Manual Configuration

#### Basic Configuration

```yaml
type: custom:samsung-washer-card
device_name: washing_machine  # Replace with your device name
```

#### Full Configuration

```yaml
type: custom:samsung-washer-card
device_name: washing_machine
icon: "mdi:washing-machine"  # Custom icon (emoji or MDI)
complete_status_for_x_hours: 2  # Hours to show "completed" status
grid_columns: 12  # Full width (1-12)
grid_rows: 12     # Card height
min_rows: 8       # Minimum height
max_rows: 20      # Maximum height
```

## Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `device_name` | string | **Required** | Name of your washer device (LG or Samsung) |
| `icon` | string | `🧺` | Icon for the card header (emoji or `mdi:icon-name`) |
| `complete_status_for_x_hours` | number | `2` | Hours to show green "completed" status light |

## Supported Entities

The card now understands the entities and attributes provided by the LG washer integration (either as attributes on `sensor.{device_name}` or as individual sensors/binary sensors) alongside the original Samsung SmartThings entities:

### LG Washer attributes/sensors
- `run_state`, `pre_state`, `current_course`
- `spin_speed`, `water_temp`, `dry_level`
- `tubclean_count`, `remain_time`, `initial_time`, `reserve_time`
- `door_lock`, `child_lock`, `remote_start`
- `steam`, `pre_wash`, `turbo_wash`
- `run_completed`, `error_state`, `error_message`

### Samsung (SmartThings) sensors (legacy)
- `sensor.{device_name}_machine_state`
- `sensor.{device_name}_job_state`
- `sensor.{device_name}_completion_time`
- `sensor.{device_name}_energy`
- `sensor.{device_name}_energy_saved`
- `sensor.{device_name}_power`
- `sensor.{device_name}_water_consumption`

### Samsung (SmartThings) binary sensors
- `binary_sensor.{device_name}_child_lock`
- `binary_sensor.{device_name}_remote_control`
- `binary_sensor.{device_name}_power`

## Examples

### With Custom Icon

```yaml
type: custom:samsung-washer-card
device_name: washing_machine
icon: "mdi:washing-machine"
```

### Multiple Washers

```yaml
# Kitchen Washer
type: custom:samsung-washer-card
device_name: washing_machine
icon: "🏠"

# Laundry Room Washer  
type: custom:samsung-washer-card
device_name: washing_machine
icon: "mdi:tumble-dryer"
```

## Screenshots

### Light Mode
![Light Mode](screenshots/eye-burn-mode.png)

### Dark Mode
![Dark Mode](screenshots/dark-mode.png)

## Development

The project has a clean, modular structure:

```text
src/
├── main.js              # Main card class
├── components/          # UI components
├── styles/              # CSS styles
└── utils/               # Helper utilities
```

### Building for Distribution

```bash
npm run build    # Creates samsung-washer-card.js for HACS
npm run dev      # Development build
npm run clean    # Clean build files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you find this card useful, consider:

- ⭐ Starring this repository
- 🐛 Reporting issues
- 💡 Suggesting new features
- ☕ [Buying me a coffee](https://buymeacoffee.com/raulpetruta)
