# Changelog

## 0.1.3

Read-only widgets, dialog control, and layout cleanup.

- Add `FAILED` handling for unresolved sends, with clear-on-tap behavior.
- Align send, waiting, and hydration behavior across widgets, including `waitForInput` rules.
- Move widget configuration toward compact YAML-based config blocks and add editor validation.
- Add `dialog.label`, `value_from`, and `label` handling in the docs and runtime.
- Tighten image and iframe layout behavior so the dashboard grid controls tile height more naturally.
- Refresh the demo flow and supporting docs to match the current widget model.


## 0.1.2

Fader display, Inputs and Read-Only.

- Add fader `value_as` display formatting for `{value}` templates and other defined formatters.
- Add Fader **Show Meter** property to hide the compact side meter.
- Give every widget one input so runtime control messages can enable and disable any widget.
- Combined Switch and Lamp but adding Read-Only.
- Aligned Wait-For-Input across widgets.

## 0.1.1

Display and interaction refinements.

- Added sending and waiting state behaviour, and wait-for-input can be disabled.
- Improved compact widget layout.
- Allow for empty `text` and `icon` behavior across icon-bearing widgets.
- Improve disabled-state styling and pending/sending interaction feedback.

## 0.1.0

Initial release.

- Add ButtonPanel Dashboard 2.0 widgets for text, button, switch, select, fader, image, and iframe panels.
- Add YAML-based widget configuration with examples and manual documentation.
- Add confirmation and PIN confirmation dialogs for interactive widgets.
- Add demo flow and reusable `buttonpanel: Dark` Dashboard theme.
- Add local development, package install testing, CI, and manual npm publish workflow support.
