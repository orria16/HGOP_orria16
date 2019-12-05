let newDealer = require('./dealer.js');

const newRandom = (randomReturnValue) => {
	return {
		randomInt: (min, max) => {
			return randomReturnValue;
		}
	};
};

// reset dependencies to normal in new tests
const resetDependencies = () => {
	return {
		'random': newRandom(0)
	};
};

// Set starting dependencies
let dependencies = resetDependencies();

// set context to work like context
const context = (name) => {
	return dependencies[name];
};

describe('Dealer test -shuffle', () => {
	test('dealer should shuffle cards, deck of 3 and random value 0', () => {
		// Set dependencies
		dependencies = resetDependencies();
		dependencies.random = newRandom(0);
		// Arrange
		let dealer = newDealer(context);
		let deck = ['a', 'b', 'c'];
		// Act
		dealer.shuffle(deck);
		// Assert
		expect(deck).toEqual(['b', 'a', 'c']);
	});
	test('dealer should shuffle cards, deck of 5 and random value 0', () => {
		// Set dependencies
		dependencies = resetDependencies();
		dependencies.random = newRandom(0);
		// Arrange
		let dealer = newDealer(context);
		let deck = ['a', 'b', 'c', 'd', 'e'];
		// Act
		dealer.shuffle(deck);
		// Assert
		expect(deck).toEqual(['d', 'a', 'b', 'c', 'e']);
	});
	test('dealer should shuffle cards, deck of 3 and random value 2', () => {
		// Set dependencies
		dependencies = resetDependencies();
		dependencies.random = newRandom(2);
		// Arrange
		let dealer = newDealer(context);
		let deck = ['a', 'b', 'c'];
		// Act
		dealer.shuffle(deck);
		// Assert
		expect(deck).toEqual(['c', 'a', 'b']);
	});
	test('dealer should shuffle cards and get larger (an undefined), deck of 3 and random value 3', () => {
		// Set dependencies
		dependencies = resetDependencies();
		dependencies.random = newRandom(3);
		// Arrange
		let dealer = newDealer(context);
		let deck = ['a', 'b', 'c'];
		// Act
		dealer.shuffle(deck);
		// Assert
		expect(deck.length).toEqual(4);
	});
});

describe('dealer test draw', () => {
	test('dealer should draw one card', () => {
		// Set dependencies
		dependencies = resetDependencies();
		// Arrange
		let dealer = newDealer(context);
		let deck =['a', 'b', 'c'];
		// Act
		let cardDrew = dealer.draw(deck);
		expect(cardDrew).toEqual('c');
		expect(deck).toEqual(['a', 'b']);
		expect(deck.length).toEqual(2);
	});
	test('dealer should draw two cards', () => {
		// Set dependencies
		dependencies = resetDependencies();
		// Arrange
		let dealer = newDealer(context);
		let deck =['a', 'b', 'c'];
		// Act
		expect(dealer.draw(deck)).toEqual('c');
		expect(dealer.draw(deck)).toEqual('b');
		expect(deck).toEqual(['a']);
		expect(deck.length).toEqual(1);
	});
});