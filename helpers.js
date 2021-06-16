
import { join } from 'https://deno.land/std@0.92.0/path/mod.ts'
import { ensureDir, exists } from 'https://deno.land/std@0.99.0/fs/mod.ts'

const downloadFiles = async dir => {
  const urls = [
    { url:"https://github.com/tomzx/gkm/raw/master/lib/gkm.jar", fileName: 'gkm.jar'},
    { url:"https://github.com/tomzx/gkm/raw/master/lib/lib/JNativeHook.jar", fileName: 'lib/JNativeHook.jar'}
  ]
  const libDir = join(dir, 'lib');
  const installed = await exists(libDir)
  if (installed) return;
  await ensureDir(libDir)
  await Promise.all(
    urls.map(async ({url, fileName}) => {
      const response = await fetch(url);
      const blob = await response.blob();
      const buf = await blob.arrayBuffer();
      const data = new Uint8Array(buf);
      const file = await Deno.create(join(dir, fileName));
      await Deno.writeAll(file, data);
      Deno.close(file.rid);
    })
  )
}

export {
  downloadFiles
}