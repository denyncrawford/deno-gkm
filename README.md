# Deno GKM
Async based, Global Keyboard and Mouse listener (GKM) driver for Deno.

Tested on Windows, but should work on Linux and Mac OS X as well (untested).

## Why?

Deno do not have any global keyboard and mouse listener available.

## Requirements

Deno GKM depends on [JNativeHook](https://github.com/kwhat/jnativehook) and [gkm-java](https://github.com/tomzx/gkm-java), which runs on Java. Thus **you will need to have a JVM available** and more importantly, java availble on your PATH, but this could change in the future.

It installs the binaries in the `%APPDATA%/gkm` folder, you will find `gkm.jar`, which source you can find at https://github.com/tomzx/gkm-java.
You will also find `JNativeHook.jar`, which source you can find at https://github.com/kwhat/jnativehook.

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

The event string format is: `[device].[event_type]` so you can listen only the events you want using wildcards:

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

## Building binaries

**Install bundler**:

```bash
deno install -f --allow-read --allow-write -n bundler https://raw.githubusercontent.com/trgwii/bundler/master/bundler.ts
```

**Run the bundler**:

```bash
bundler ts-bundle lib jars.b.ts
```

## License
The code is licensed under the MIT license (http://opensource.org/licenses/MIT). See license.txt.