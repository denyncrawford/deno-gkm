import gkm from '../mod.ts'

for await (const line of gkm()) {
	console.log(line)
}

