
import { join, ensureDir, exists } from '../deps.ts'
import files from './jars.b.ts'

const gkm = files['gkm.jar'];
const JNativeHook = files.lib['JNativeHook.jar'];

const writeBinaries = async (dir: string) => {
  const libDir = join(dir, 'lib');
  const installed = await exists(libDir)
  if (installed) return;
  await ensureDir(libDir)
  await Deno.writeFile(join(dir, 'gkm.jar'), gkm)
  await Deno.writeFile(join(libDir, 'JNativeHook.jar'), JNativeHook)
}

const wildTest = (wildcard: string, str: string) => {
  const w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&'); // regexp escape 
  const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
  return re.test(str);
}

export {
  writeBinaries,
  wildTest
}