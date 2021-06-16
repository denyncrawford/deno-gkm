import { join, readLines } from '../deps.ts'
import { writeBinaries, wildTest } from './helpers.ts'
// TODO: Verify if we're getting loaded from multiples location and prevent creating new child processes?

const name = 'gkm';

const folder = Deno.build.os === 'windows'
  ? join(Deno.env.get('APPDATA') || Deno.cwd(), name)
  : join(Deno.env.get('HOME') || Deno.cwd(), '.' + name);

const binFolder = folder + '/bin';

await writeBinaries(binFolder);

export const gkm = async function* () {
	const reader = Deno.run({ 
		cmd: [ "java", "-jar", join(binFolder, 'gkm.jar') ],
		stdout: 'piped',
		stderr: 'piped',
		stdin: 'piped'
	});

	for await (const line of readLines(reader.stdout)) {
	const data = line.toString().split(/\r\n|\r|\n/).filter((item) =>  item);
	const parts = data[0].split(':');
	const evt = { event: parts[0], data:parts[1]}
		yield evt
	}
}

export const wildcard = async function*(pattern: string) {
	for await (const event of gkm()) {
		if (wildTest(pattern, event.event)) yield event;
	}
}