import { wildcard } from '../mod.ts'

for await (const evt of wildcard('mouse.*')) {
	console.log(evt)
}