# Deno GKM
Async based, Global Keyboard and Mouse listener (GKM) for Deno.

> We're planing to implement GKM as an event trigger in the future, so it can be used for automation.

Built on Windows, there's no Linux binaries available at the moment.

## Why?

Deno do not have any global keyboard and mouse listener available.

## Requirements

Deno GKM doesn't depends on Java anymore but it still requires the executable binary **Rusty GKM** which is a rust native plugin for listening (and emitting in the future) system events.

It automatically installs the binary in the `%APPDATA%/gkm` | `%HOME%/gmk` folder, you will find `gkm.exe`, which source you can find at https://github.com/denyncrawford/rusty-gkm.

## Getting started

**Import gkm**:

```JavaScript
import gkm from 'https://raw.githubusercontent.com/denyncrawford/deno-gkm/master/mod.ts'
```

**Then use it as async iterator**:

```javascript
import gkm from './mod.ts'

for await (const line of gkm()) {
    const { event, data } = line;
	console.log(`${event}: ${data}`)
}
```

**The event string format is**: `[device].[event_type]` so you can listen only the events you want using ***wildcards***:

**This will yield only mouse events**:

```javascript
import { wildcard } from './mod.ts'
for await (const line of wildcard('mouse.*')) {
    const { event, data } = line;
	console.log(`${event}: ${data}`)
}
```

**This will yield only keyboard events**: 

```javascript
...const line of wildcard('key.*')...
```

## Accessing event names, data values and literals

Since the event names are designed to be level accessible (trough wildcards), they follow the `[device].[event_action]?.[action_complement]`. 

**Available event names**:

```bash
mouse.move
mouse.wheel
mouse.button.press
mouse.button.release
key.press
key.release
```

**Available data value formats**:

- Mouse Move and Wheel: Data object with coordinates or deltas.
- Mouse Button and keys: Key or button string.

**Literals**:

Literals are values of key press or wheel modifications, so you can detect character case state or keybinding codes. If the event doesn't haver or support literals it will be `None`.

## Building the binary

**Install bundler**:

```bash
deno install -f --allow-read --allow-write -n bundler https://raw.githubusercontent.com/trgwii/bundler/master/bundler.ts
```

**Run the bundler**:

```bash
bundler ts-bundle lib gkm.b.ts
```

## License
The code is licensed under the MIT license (http://opensource.org/licenses/MIT). See license.txt.