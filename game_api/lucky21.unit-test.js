const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

describe('Testing guess21OrUnder', () => {
  test('guess21OrUnder should draw the next card', () => {
    // Arrange
    let deck = deckConstructor();
    deck = [
      '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    // Act
    game.guess21OrUnder(game);

    // Assert
    expect(game.state.cards.length).toEqual(3);
    expect(game.state.cards[2]).toEqual('01D');
  });
});

describe('Testing guessOver21', () => {
  test('guessOver21 should draw next card and set player card as that card', () => {
    // Set dependencies
    let deck = deckConstructor();
    deck = [
      '05C', '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    // Act
    game.guessOver21(game);
    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.card).toEqual('01D');
  });
});

describe('Test game initiation', () => {
  test('a new game should have 50 cards left in the deck', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();

    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    expect(game.state.deck.length).toEqual(50);
  });

  test('a new game should have 2 drawn cards', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};

    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    expect(game.state.cards.length).toEqual(2);
  });
});

describe('Test Game over', () =>{
  test('Guessed over 21 and isGameOver should return true', () => {
    // Set dependencies
    let deck = deckConstructor();
    deck = [
      '01D', '09S', '10H',
    ];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.card = '05C';
    // Arrange
    expect(game.isGameOver(game)).toEqual(true);
  });

  test('Guessed under and the total is over 21 and isGameOver should return true', ()=>{
    let deck = deckConstructor();
    deck = ['05C', '10D', '09S'];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.guess21OrUnder(game);
    // Arrange
    expect(game.isGameOver(game)).toEqual(true);
  });

  /* test('Guessed 21 or under and total is equal to 21 and isGameOver should return true', ()=>{
        let deck = deckConstructor();
        deck = ['05C', '10D', '06C'];
        let dealer = dealerConstructor();
        // Override the shuffle to do nothing.
        dealer.shuffle = (deck) => {};
        // Inject our dependencies
        let game = lucky21Constructor(deck, dealer);
        expect(game.isGameOver(game)).toEqual(true);
    });*/

  test('Guessed 21 or under and the total is under 21 and isGameOver should return false', ()=>{
    let deck = deckConstructor();
    deck = ['01D', '09S', '05C'];
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);

    expect(game.isGameOver(game)).toBe(false);
  });
});

describe('Testing playerWon', ()=>{
  test('Guessed 21 or under twice and total is = 21 and playerWon should return true', ()=>{
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01D', '09S', '06H', '05C'];
    expect(game.playerWon(game)).toEqual(true);
  });

  test('Guessed 21 or under and then over 21 and total is > 21 and playerWon should return true', ()=>{
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01D', '09S', '10H'];
    game.state.card = '05C';
    expect(game.playerWon(game)).toEqual(true);
  });
});

describe('Testing getCardsValue', () =>{
  test('The card value after two guesses should return 25', ()=>{
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['05H', '07D', '13S', '03C'];

    expect(game.getCardsValue(game)).toEqual(25);
  });

  test('The card value after one guesses should return 18', ()=>{
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['05H', '07D', '06D'];

    expect(game.getCardsValue(game)).toEqual(18);
  });

  test('getCardsValue should return 15', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01S', '04D'];

    expect(game.getCardsValue(game)).toEqual(15);
  });

  test('getCardsValue with card defined should return 18', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01C', '08D', '09S'];
    game.state.card = '13C';

    expect(game.getCardsValue(game)).toEqual(18);
  });

  test('getCardsValue should return 23', ()=>{
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['08S', '05C', '01D', '02H', '07S'];

    expect(game.getCardsValue(game)).toEqual(23);
  });
  test('getCardsValue of three aces should return 13', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01D', '01S', '01C'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(13);
  });

  test('getCardsValue of four aces should return 14', () => {
    const deck = deckConstructor();

    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['01D', '01S', '01H', '01C'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(14);
  });
  test('getCardsValue of all royal cards should return 30', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['11S', '12C', '13H'];
    // Assert
    expect(game.getCardsValue(game)).toEqual(30);
  });
});

describe('Testing getCardValue', () => {
  test('getCardValue where cards value is > 11 should return 1', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    // Arrange
    game.state.cards = ['03S', '04C', '05D'];
    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(1);
  });

  test('getCardValue where cards value is = 11 should return 1', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['03S', '04C', '04D'];
    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(1);
  });

  test('getCardValue where cards value is < 11 should return 11', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['03S', '04C', '03D'];

    game.state.card = '01H';
    // Assert
    expect(game.getCardValue(game)).toEqual(11);
  });

  test('getCardValue should return undefined', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    // Assert
    expect(game.getCardValue(game)).toEqual(undefined);
  });

  test('getCardValue should return undefined', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    // Assert
    expect(game.getCardValue(game)).toEqual(undefined);
  });

  test('getCardValue should return 7', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.card = '07H';
    // Assert
    expect(game.getCardValue(game)).toEqual(7);
  });
});

describe('Testing getTotal', () => {
  test('getTotal should return 16', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['12S', '03C', '03D'];

    // Assert
    expect(game.getTotal(game)).toEqual(16);
  });

  test('getTotal should return 21', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['05S', '05C', '01D'];
    // Assert
    expect(game.getTotal(game)).toEqual(21);
  });


  test('getTotal should return 16', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['03C', '03D'];
    game.state.card = '12S';
    // Assert
    expect(game.getTotal(game)).toEqual(16);
  });

  test('getTotal should return 21', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['05C', '01D'];
    game.state.card = '05S';
    // Assert
    expect(game.getTotal(game)).toEqual(21);
  });

  test('getTotal should return 27', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['05C', '02D', '13D'];
    game.state.card = '10S';
    // Assert
    expect(game.getTotal(game)).toEqual(27);
  });
});

describe('Testing getCards', () => {
  test('getCards should return ["13S", "07D", "05H"]', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['13S', '07D', '05H'];
    // Assert
    expect(game.getCards(game)).toEqual(['13S', '07D', '05H']);
  });

  test('getCards should return ["04D", "01S"]', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['04D', '01S'];
    // Assert
    expect(game.getCards(game)).toEqual(['04D', '01S']);
  });

  test('getCards should return ["13S", "06S", "08D", "01C"]', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['13S', '06S', '08D', '01C'];
    // Assert
    expect(game.getCards(game)).toEqual(['13S', '06S', '08D', '01C']);
  });

  test('getCards should return ["07S", "01H", "10D", "05C", "08S"]', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.cards = ['07S', '01H', '10D', '05C', '08S'];
    // Assert
    expect(game.getCards(game)).toEqual(['07S', '01H', '10D', '05C', '08S']);
  });
});

describe('Testing getCard', () => {
  test('getCard should return "08S"', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    game.state.card = '08S';
    // Assert
    expect(game.getCard(game)).toEqual('08S');
  });

  test('getCard should return undefined', () => {
    const deck = deckConstructor();
    const dealer = dealerConstructor();
    // Override the shuffle to do nothing.
    dealer.shuffle = (deck) => {};
    // Inject our dependencies
    const game = lucky21Constructor(deck, dealer);
    // Assert
    expect(game.getCard(game)).toEqual(undefined);
  });
});
