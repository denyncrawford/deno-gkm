import gkm from './mod.js'

for await (const line of gkm()) {
	console.log(line)
}