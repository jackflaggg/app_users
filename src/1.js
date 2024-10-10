const fs = require('fs');
async function main() {
	console.log('1) START');
	setTimeout(() => console.log('7) SetTimeout'), 0);
	setImmediate(() => console.log('10) setImmediate'));

	Promise.resolve().then(() => {
		console.log('2) Promise');
		process.nextTick(() => console.log('5) Promise next tick'));
	});

	fs.readFile('index.js', () => {
		console.log('8) Read file');
		setTimeout(() => console.log('13) Read file SetTimeout'), 0);
		setImmediate(() => console.log('11) Read file setImmediate'));
		process.nextTick(() => console.log('9) Read file next tick'));
	});

	const response = await Promise.resolve('3) Async/await');
	console.log(response);

	process.nextTick(() => console.log('6) Next tick'));
	setTimeout(() => console.log('12) SetTimeout'), 0);

	console.log('4) END');
}
main();