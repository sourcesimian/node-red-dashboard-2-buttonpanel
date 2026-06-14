# ButtonPanel Manual

ButtonPanel provides compact Dashboard 2.0 widgets for building tactile button, switch, fader, lamp, image, and iframe panels in Node-RED Dashboard 2.0. The button tile style and interaction model were inspired by [`sourcesimian/mqtt-panel`](https://github.com/sourcesimian/mqtt-panel).

## ButtonPanel Config

Each node has a **Config** YAML field for widget-specific settings. The editor
also provides an **Example Config** button with the relevant keys for that
widget.

Material icons can be browsed at
[`fonts.google.com/icons`](https://fonts.google.com/icons).

The YAML parser is intentionally small and supports the config shapes generated
by the editor: scalar `key: value` entries, `values` lists, `ranges` lists, and
an `attributes` map for iframes.

Import [`examples/buttonpanel-demo-flow.json`](examples/buttonpanel-demo-flow.json) for a complete
demo dashboard. It includes every widget mode and uses feedback
delays to demonstrate the pending state on in/out widgets.

Import [`examples/buttonpanel-dark-theme.json`](examples/buttonpanel-dark-theme.json)
to add only the reusable Dashboard 2.0 `buttonpanel: Dark` theme. Dashboard
themes are `ui-theme` config nodes, so they are selected from a page
configuration rather than dragged from the normal node palette.

All widgets also accept these optional top-level config keys:

```yaml
value_from: msg.payload
value_type: string
topic: device/command
```

`value_from` selects the incoming value before the widget sees it. It defaults
to `msg.payload`, supports dot notation such as `msg.device.state`, and can use
JSONata expressions when supported by the Node-RED runtime. `value_type`
converts outgoing widget config values before they are emitted as `msg.payload`.
Supported types are `string`, `number`, `boolean`, `json`, and `buffer`. `topic`
is optional and is only included on output messages when configured.

For entries inside `values`, the top-level `topic`, `confirm`, `confirm_pin`,
and `input_timeout` values are inherited unless the entry provides its own.

## ButtonPanel Text Config

Text displays the incoming value. If no value has arrived, it displays `text`
from the config. When **Editable** is checked, tapping the widget opens an edit
dialog and emits the entered value.

```yaml
text:
icon: keyboard
color: "#f6f26b"
input_timeout: 0
```

## ButtonPanel Button Config

Button has no input and emits the configured `value`. `confirm` shows a confirmation dialog.
`confirm_pin` can be set to a positive digit count to require PIN entry before
the value is sent.

```yaml
text: Play
value: PLAY
icon: play_arrow
color: "#52D017"
confirm: Run command?
confirm_pin: 0
input_timeout: 0
```

## ButtonPanel Switch Config

Switch maps incoming values to `values`. Tapping the widget cycles to the next
configured value and emits that value. Each value can have its own
`topic`, `confirm`, `confirm_pin`, and `input_timeout`.

```yaml
input_timeout: 0
values:
  - value: OFF
    text: Off
    icon: toggle_off
    color: "#7f8790"
  - value: ON
    text: On
    icon: toggle_on
    color: "#52D017"
    confirm: Turn this on?
    confirm_pin: 4
```

## ButtonPanel Select Config

Select maps incoming values to `values`. Tapping the widget opens a selection
dialog. Each value can have its own `topic`, `confirm`, `confirm_pin`, and
`input_timeout`.

```yaml
input_timeout: 0
values:
  - value: MOUNTAIN
    text: Mountain
    icon: landscape
    color: "#bdbdbd"
  - value: COAST
    text: Coast
    icon: waves
    color: "#26c6da"
    confirm: Switch to coast?
    confirm_pin: 4
```

When **Button** is checked, Select does not use an input. It displays the
top-level `text`, `icon`, and `color`; tapping it opens the configured `values`
dialog and emits the selected value.

```yaml
text: Scene
icon: radio_button_checked
color: "#26c6da"
input_timeout: 0
values:
  - value: MOUNTAIN
    text: Mountain
    icon: landscape
    color: "#bdbdbd"
  - value: COAST
    text: Coast
    icon: waves
    color: "#26c6da"
    confirm: Switch to coast?
    confirm_pin: 4
```

## ButtonPanel Fader Config

Fader displays an incoming numeric value against configured `ranges`. By
default, tapping the widget opens the vertical fader dialog and emits the
selected numeric value. When **Gauge** is checked, the widget is display-only.

```yaml
text: Level
icon: tune
color: "#62a8ea"
min: 0
max: 100
live: false
input_timeout: 0
ranges:
  - range: [0, 40]
    text: Low
    icon: battery_1_bar
    color: "#91c900"
  - range: [41, 75]
    text: Good
    icon: battery_4_bar
    color: "#00c000"
  - range: [76, 100]
    text: High
    icon: warning
    color: "#f89406"
```

## ButtonPanel Lamp Config

Lamp is display-only. It maps incoming values to `values`.

```yaml
values:
  - value: OFF
    text: OFF
    icon: emoji_objects
    color: "#7f8790"
  - value: ON
    text: ON
    icon: emoji_objects
    color: "#ffd84d"
```

## ButtonPanel Image Config

Image is display-only. The incoming value is used as the image URL. `overflow`
can be `hidden`, `visible`, `scroll`, or `auto`. Sizing is controlled by the
Dashboard grid item.

```yaml
overflow: hidden
```

When **Button** is checked, Image also emits a button-style message when tapped:

```yaml
overflow: hidden
value: IMAGE
confirm: Send image command?
confirm_pin: 0
input_timeout: 0
```

## ButtonPanel Iframe Config

Iframe is display-only. The incoming value is used as the iframe URL. The
Dashboard node **Height** controls the outer grid frame. Iframes default to
`scrolling: auto` and `overflow: auto`.

```yaml
attributes:
  loading: lazy
  referrerpolicy: no-referrer
  scrolling: auto
  overflow: auto
```

The `attributes` map is applied to the iframe except for `src`, `style`,
`class`, `frameborder`, and `overflow`. `overflow` is consumed by ButtonPanel as
a wrapper style.

## Message Contract

Incoming messages update the widget through `value_from`:

```js
{
  payload: {
    state: "ON"
  }
}
```

With `value_from: msg.payload.state`, the widget receives `ON`.

Interactive widgets emit messages:

```js
{
  payload: "ON",
  topic: "device/command"
}
```

If no `topic` is configured, the output message only contains `payload`. When a
PIN confirmation is configured and completed, the outgoing message also includes
`pin`.
