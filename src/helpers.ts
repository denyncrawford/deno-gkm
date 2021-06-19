
import { join, ensureDir, exists } from '../deps.ts'
import files from './gkm.b.ts'

const gkm = files['gkm.exe'];

export const writeBinaries = async (dir: string) => {
  const libDir = join(dir, 'lib');
  const installed = await exists(libDir)
  if (installed) return;
  await ensureDir(libDir)
  await Deno.writeFile(join(dir, 'gkm.exe'), gkm)
}

export const wildTest = (wildcard: string, str: string) => {
  const w = wildcard.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${w.replace(/\*/g,'.*').replace(/\?/g,'.')}$`,'i');
  return re.test(str);
}

export const format = (line:string) => {
  const n = line.substring(line.indexOf('name')).slice(0,-1);
  const typeKeyword = "event_type:";
  const typeValue = n.substring(n.indexOf(typeKeyword) + typeKeyword.length).split(' ')[1].split('(')[0];
  let type: string | string[] = typeValue.split(/(?=[A-Z])/).map(e => e.toLocaleLowerCase());
  const deviceType = type[0];
  type = deviceType == 'key' || deviceType == 'mouse' ? type.join('.') : 'mouse.' + type.join('.');
  const data = { value: '', literal: ''};
  data.value = typeValue === 'MouseMove' || typeValue === 'Wheel' 
               ? JSON.parse(n.substring(n.indexOf(typeValue) + typeValue.length).replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/g, '"$2": ')) 
               : n.substring(n.indexOf(typeValue) + typeValue.length).split(/[()]+/).slice(-2)[0].replace('Key', '');        
  const lit = n.substring(n.indexOf('name') + 'name'.length + 1, n.indexOf(',')).trim();
  data.literal = lit === 'None' ? lit : lit.split('"').slice(-2)[0]       
  return { event: type, data }
}