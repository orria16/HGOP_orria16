const deckConstructor = require('./deck.js');

describe('Testing the deck functionality', () => {
  test('a deck should have 52 cards', () => {
    const deck = deckConstructor();
    expect(deck.length).toEqual(52);
  });
});
