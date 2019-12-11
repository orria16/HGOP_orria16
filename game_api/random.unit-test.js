const randomConstructor = require('./random.js');

describe('Testing the random functionality', () => {
	test('Random yields a number between 0 and 10', () => {
		const min = 0;
		const max = 10;
		const newRandom = randomConstructor();
		const randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toBeLessThanOrEqual(max);
		expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
	});
	test('Random yields a number that is exactly 10', () => {
		const min = 10;
		const max = 10;
		const newRandom = randomConstructor();
		const randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toEqual(max);
		expect(randomInt(min, max)).toEqual(min);
	});
	test('Random yields a number between 0 and 1', () => {
		const min = 0;
		const max = 1;
		const newRandom = randomConstructor();
		const randomInt = newRandom.randomInt;
		expect(randomInt(min, max)).toBeLessThanOrEqual(max);
		expect(randomInt(min, max)).toBeGreaterThanOrEqual(min);
	});
});
