# Deno GKM
Async based, Global Keyboard and Mouse listener (GKM) driver for Deno.

Tested on Windows, but should work on Linux and Mac OS X as well (untested).

## Why?

Deno do not have any global keyboard and mouse listener available.

## Requirements

Deno GKM depends on [JNativeHook](https://github.com/kwhat/jnativehook) and [gkm-java](https://github.com/tomzx/gkm-java), which runs on Java. Thus you will need to have a JVM available and more importantly, java availble on your PATH, but this could change in the future.

It installs the binaries in the `%APPDATA%/gkm` folder, you will find `gkm.jar`, which source you can find at https://github.com/tomzx/gkm-java.
You will also find `JNativeHook.jar`, which source you can find at https://github.com/kwhat/jnativehook.

## Getting started

**Import gkm**:

```JavaScript
import gkm from 'https://raw.githubusercontent.com/denyncrawford/deno-gkm/master/mod.js'
```

**Then use it as async iterator**:

```javascript
var gkm = require('gkm');

// Listen to all key events (pressed, released, typed)
gkm.events.on('key.*', function(data) {
    console.log(this.event + ' ' + data);
});

import gkm from './mod.js'

for await (const line of gkm()) {
    const { event, data } = line;
	console.log(`${event}: ${data}`)
}
```

## License
The code is licensed under the MIT license (http://opensource.org/licenses/MIT). See license.txt.