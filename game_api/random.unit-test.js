let randomConstructor = require('./random.js');

describe('Testing the random functionality', () => {
	test('Random yields a number between 0 and 10', () => {
		let min = 0;
		let max = 10;
		let newRandom = randomConstructor();
		let randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toBeLessThanOrEqual(max);
		expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
	});
	test('Random yields a number that is exactly 10', () => {
		let min = 10;
		let max = 10;
		let newRandom = randomConstructor();
		let randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toEqual(max);
		expect(randomInt(min, max)).toEqual(min);
	});
	test('Random yields a number between 0 and 1', () => {
		let min = 0;
		let max = 1;
		let newRandom = randomConstructor();
		let randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toBeLessThanOrEqual(max);
		expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
	});
});