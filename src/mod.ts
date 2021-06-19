import { join, readLines } from '../deps.ts'
import { writeBinaries, wildTest, format } from './helpers.ts'
// TODO: Verify if we're getting loaded from multiples location and prevent creating new child processes?

const name = 'gkm';

const folder = Deno.build.os === 'windows'
  ? join(Deno.env.get('APPDATA') || Deno.cwd(), name)
  : join(Deno.env.get('HOME') || Deno.cwd(), '.' + name);

await writeBinaries(folder);

export const gkm = async function* () {
	const reader = Deno.run({ 
		cmd: [ join(folder, 'gkm.exe') ],
		stdout: 'piped'
	});

	for await (const line of readLines(reader.stdout)) {
		yield format(line)
	}
}

export const wildcard = async function*(pattern: string) {
	for await (const event of gkm()) {
		if (wildTest(pattern, event.event)) yield event;
	}
}