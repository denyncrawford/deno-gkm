import { join } from 'https://deno.land/std@0.92.0/path/mod.ts'
import { readLines } from 'https://deno.land/std@0.99.0/io/bufio.ts'
import { downloadFiles } from './helpers.js'
// TODO: Verify if we're getting loaded from multiples location and prevent creating new child processes?

const name = 'gkm';

const folder = Deno.build.os === 'windows'
  ? join(Deno.env.get('APPDATA'), name)
  : join(Deno.env.get('HOME'), '.' + name);

const binFolder = folder + '/bin';

await downloadFiles(binFolder);

export default async function* () {
	const reader = Deno.run({ 
		cmd: [ "java", "-jar", join(binFolder, 'gkm.jar') ],
		stdout: 'piped',
		stderr: 'piped',
		stdin: 'piped'
	});

	for await (const line of readLines(reader.stdout)) {
	const data = line.toString().split(/\r\n|\r|\n/).filter((item) => { return item; });
	const parts = data[0].split(':');
	const evt = {event: parts[0], data:parts[1]}
		yield evt
	}
}