# Node-RED Dashboard 2.0 ButtonPanel

Compact Node-RED Dashboard 2.0 button panel widgets for building tactile button, switch, fader, image, and iframe panels.

## Nodes

- `buttonpanel text`: display text values, optionally read-only
- `buttonpanel button`: emit a configured command value
- `buttonpanel switch`: cycle through configured states
- `buttonpanel select`: choose one configured state from a dialog
- `buttonpanel fader`: edit a numeric range value, or display it as read-only
- `buttonpanel image`: display an image URL, optionally interactive
- `buttonpanel iframe`: embed a URL

See [MANUAL.md](MANUAL.md) for configuration details and examples.

## Example Flow

Import [examples/buttonpanel-demo-flow.json](examples/buttonpanel-demo-flow.json) into Node-RED for a
dashboard that demonstrates every widget mode, including delayed feedback for
interactive widgets.

Import [examples/buttonpanel-dark-theme.json](examples/buttonpanel-dark-theme.json)
if you only want the reusable Dashboard 2.0 `buttonpanel: Dark` theme.

## Build

```sh
npm install
npm run build
```

The build writes the Dashboard bundle to `resources/ui-buttonpanel.umd.js`.

## Local Development With Make

This repository keeps a disposable Node-RED user directory in `_node_red`.

```sh
make setup
make link
make run
```

Then open:

```text
http://127.0.0.1:1880/
```

`make setup` installs Node-RED and Dashboard 2.0 into `_node_red`. `make link` builds this package and symlinks it into `_node_red/node_modules` as `@sourcesimian/node-red-dashboard-2-buttonpanel`.

To test the package as an installed tarball instead of a symlink, use:

```sh
make install-package
make run
make uninstall-package
```

## Install Locally Into Node-RED

From your Node-RED user directory:

```sh
npm install /path/to/node-red-dashboard-2-buttonpanel
```

Or, after publication:

```sh
npm install @sourcesimian/node-red-dashboard-2-buttonpanel
```

Restart Node-RED, then add ButtonPanel nodes from the palette.

## Attribution

The button tile style and interaction model were inspired by [`sourcesimian/mqtt-panel`](https://github.com/sourcesimian/mqtt-panel).

# License
In the spirit of the Hackers of the [Tech Model Railroad Club](https://en.wikipedia.org/wiki/Tech_Model_Railroad_Club) from the [Massachusetts Institute of Technology](https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology), who gave us all so very much to play with. The license is [MIT](LICENSE).
